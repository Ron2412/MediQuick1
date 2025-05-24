import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }

    // Add a system prompt as the first message
    const systemPrompt = {
      role: "user",
      content: `
You are MediQuick, an AI health advisor specializing in medical triage and health-related solutions.
- Always provide short, specific, and actionable advice based on the user's symptoms.
- If you need more information, ask only one clear follow-up question at a time.
- Avoid asking multiple questions in a single response.
- Use concise bullet points and summarised answers for advice.
- If symptoms are urgent or life-threatening, clearly advise immediate medical attention and include the disclaimer.
- Use friendly, empathetic, and clear language.
`
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [systemPrompt, ...messages].map((msg) => ({ text: msg.content })),
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

    // If the fallback is used, return the full data for debugging
    if (aiText === "Sorry, I couldn't understand that.") {
      return NextResponse.json({ text: aiText, raw: data });
    }

    return NextResponse.json({ text: aiText });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch from Gemini API', details: err.message }, { status: 500 });
  }
} 