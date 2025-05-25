import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json();
    // The ChatbotPanel now sends the full message history
    const incomingMessages = body.messages; // This is an array of {role: string, content: string}
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }

    if (!incomingMessages || incomingMessages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // System prompt
    const systemInstruction = {
      role: "system", // Using a "system" role, though Gemini sometimes prefers this as a first user message
      content: `
You are MediQuick, an AI health advisor specializing in medical triage and health-related solutions.
- Always provide short, specific, and actionable advice based on the user's symptoms.
- If you need more information, ask only one clear follow-up question at a time.
- Avoid asking multiple questions in a single response.
- Use concise bullet points and summarised answers for advice.
- If symptoms are urgent or life-threatening, clearly advise immediate medical attention and include the disclaimer: 'Disclaimer: This is not a substitute for professional medical advice. If you have a medical emergency, please call your local emergency number or visit the nearest emergency room.'
- Use friendly, empathetic, and clear language.
- Do not greet the user in the first message if the conversation has already started (i.e. if there are previous user messages).
- Always make a triage decision (emergency, clinic visit, or self-care) based on the user's symptoms, but do NOT include a 'Triage:' label or category in your response. The triage category should be clear from your advice, not as a label.
`
    };

    // Transform messages for Gemini API
    // Gemini expects roles to alternate between "user" and "model".
    // The system prompt can be sent as the first message with role "user",
    // or as `system_instruction` (though `gemini-1.5-flash` might prefer it in `contents`).
    // We will prepend the system prompt as a "user" message, and then append actual user/assistant messages.

    const formattedContents = [
      { role: "user", parts: [{ text: systemInstruction.content }] },
      ...incomingMessages.map(msg => ({
        // Ensure role is either 'user' or 'model'. 
        // Our frontend uses 'assistant' for the bot, so map it to 'model'.
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    ];
    
    // Ensure roles alternate correctly if the system prompt is user and first actual message is user.
    // This basic mapping assumes the history from client is already alternating correctly (user, assistant, user...)
    // A more robust solution might involve merging consecutive user/model messages if the API strictly requires alternation and history isn't perfect.

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedContents,
          // Optional: Add generationConfig if needed (e.g., temperature, maxOutputTokens)
          // generationConfig: {
          //   temperature: 0.7,
          //   maxOutputTokens: 1000,
          // },
          // Optional: Add safetySettings if specific configurations are needed
          // safetySettings: [
          //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
          // ]
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini API Error:', JSON.stringify(data, null, 2));
      const errorDetail = data.error?.message || 'Failed to get a valid response from Gemini API.';
      return NextResponse.json({ error: errorDetail, details: data }, { status: geminiRes.status });
    }
    
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that. Please try again.";

    return NextResponse.json({ text: aiText });

  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Failed to process chat request', details: err.message }, { status: 500 });
  }
} 