"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, Send, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Helper to extract triage info from AI response
function parseTriageResult(aiText) {
  // Remove explicit triage label extraction. Use improved heuristics.
  let urgency = "green";
  let reason = aiText;
  let tip = "";

  // Emergency (red):
  if (/\b(emergency|immediate|urgent|ER|hospital|life[- ]?threatening|call 911|call your local emergency number|visit the nearest emergency room)\b/i.test(aiText)) {
    urgency = "red";
  }
  // Clinic visit (yellow):
  else if (/(clinic|doctor|visit|appointment|see a doctor|medical evaluation|consult a doctor|schedule a checkup|should be checked by a doctor)/i.test(aiText)) {
    urgency = "yellow";
  }
  // Self-care (green):
  else if (/(self[- ]?care|monitor|rest|hydration|home|observe|mild symptoms|no immediate action needed|can be managed at home)/i.test(aiText)) {
    urgency = "green";
  }

  // Try to extract a tip (first bullet or sentence)
  const bullet = aiText.match(/[-•]\s*(.+)/);
  if (bullet) tip = bullet[1];
  else tip = aiText.split(/[.\n]/)[0];

  return { urgency, reason, tip };
}

export function ChatbotPanel() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm MediQuick, your AI health assistant. Tell me about your symptoms or health concerns, and I'll help you decide what to do next." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [triageBanner, setTriageBanner] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = { role: "user", content: inputValue.trim() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newUserMessage] }), // Send entire history
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `API request failed with status ${res.status}`);
      }

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.text };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // Parse triage result and set urgency banner if needed
      const triage = parseTriageResult(data.text);
      if (triage.urgency === "yellow") {
        setTriageBanner({
          color: "yellow",
          icon: (
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ),
          label: "Clinic Visit Recommended",
          message: "You need to visit a clinic."
        });
      } else if (triage.urgency === "red") {
        setTriageBanner({
          color: "red",
          icon: (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ),
          label: "Emergency",
          message: (
            <span>
              This is an emergency. Seek immediate help.<br />
              <span className="block mt-1 text-xs text-red-700 font-semibold">Disclaimer: This is not a substitute for professional medical advice. If you have a medical emergency, please call your local emergency number or visit the nearest emergency room.</span>
            </span>
          )
        });
      } else if (triage.urgency === "green") {
        setTriageBanner({
          color: "green",
          icon: (
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ),
          label: "Self-Care",
          message: "You can manage this with self-care."
        });
      } else {
        setTriageBanner(null);
      }
    } catch (err) {
      setError(err.message);
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Banner color classes
  const bannerColorClasses = {
    yellow: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800",
    red: "bg-red-100 border-l-4 border-red-500 text-red-800",
    green: "bg-emerald-50 border-l-4 border-emerald-600 text-emerald-800"
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="bg-emerald-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-heading">
          <Bot className="h-6 w-6 text-emerald-600" />
          MediQuick Assistant
        </CardTitle>
      </CardHeader>
      {/* Triage Banner for urgency */}
      {triageBanner && (
        <div className={`p-4 text-base font-medium flex items-start gap-3 ${bannerColorClasses[triageBanner.color]}`}>
          {triageBanner.icon}
          <div>
            <div className="font-bold uppercase tracking-wide text-sm mb-1">Triage: {triageBanner.label}</div>
            <div>{triageBanner.message}</div>
          </div>
        </div>
      )}
      <CardContent className="flex-grow p-4 bg-white">
        <div className="h-96 overflow-y-auto space-y-4" style={{ maxHeight: '24rem' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "assistant" && (
                <Bot className="h-6 w-6 text-emerald-500 flex-shrink-0" />
              )}
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <User className="h-6 w-6 text-emerald-700 flex-shrink-0" />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500">
              <Bot className="h-5 w-5 animate-spin" />
              <span>MediQuick is thinking...</span>
            </div>
          )}
          {error && (
             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md">
               <p className="font-bold">Error</p>
               <p>{error}</p>
             </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t bg-white rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Ask about your symptoms..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
