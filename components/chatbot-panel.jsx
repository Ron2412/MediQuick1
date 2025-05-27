"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaRobot, FaUserCircle } from "react-icons/fa"
import { FaRegPaperPlane } from "react-icons/fa6"

const assistantAvatar = "/doctor-avatar.png" // Place a doctor avatar image in public/
const userAvatar = "/user-avatar.png" // Place a user avatar image in public/

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

export function ChatbotPanel({ onTriageResult }) {
  const [messages, setMessages] = useState([
    { role: "assistant", name: "MediPal", content: "Hello! I'm MediPal, your friendly health assistant. How can I help you today?" }
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
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newUserMessage = {
      role: "user",
      name: "You",
      content: inputValue.trim(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newUserMessage] }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `API request failed with status ${res.status}`);
      }
      const data = await res.json();
      const aiMessage = {
        role: "assistant",
        name: "MediPal",
        content: data.text,
      };
      setMessages((prev) => [...prev, aiMessage]);
      if (onTriageResult) onTriageResult(data.text);

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
      setMessages((prev) => [...prev, { role: "assistant", name: "MediPal", content: `Error: ${err.message}` }]);
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
    <div className="relative flex flex-col h-[600px] max-h-[70vh] box-border bg-transparent">
      <div className="flex-1 overflow-y-auto px-2 md:px-4 pt-2 pb-2 space-y-4 box-border" style={{paddingBottom: '76px'}}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}> 
            {msg.role === "assistant" && (
              <div className="flex items-start gap-2 max-w-[90%] md:max-w-[70%]">
                <span className="flex items-center justify-center text-emerald-600 text-2xl mt-1">
                  <FaRobot />
                </span>
                <div>
                  <div className="text-xs font-semibold text-[#4c889a] mb-1">{msg.name}</div>
                  <div className="bg-gradient-to-br from-emerald-50 to-white text-[#222] rounded-2xl px-4 py-3 text-sm shadow-md whitespace-pre-line max-w-[320px] md:max-w-[380px] break-words border-none">
                    {msg.content}
                  </div>
                </div>
              </div>
            )}
            {msg.role === "user" && (
              <div className="flex items-start gap-2 max-w-[90%] md:max-w-[70%] flex-row-reverse">
                <span className="flex items-center justify-center text-[#2d7bb6] text-2xl mt-1">
                  <FaUserCircle />
                </span>
                <div>
                  <div className="text-xs font-semibold text-[#4c889a] mb-1 text-right">{msg.name}</div>
                  <div className="bg-gradient-to-br from-blue-200 to-blue-100 text-[#1e293b] rounded-2xl px-4 py-3 text-sm shadow-md whitespace-pre-line text-right max-w-[320px] md:max-w-[380px] break-words border-none">
                    {msg.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 mt-2 max-w-[90%] md:max-w-[70%]">
            <span className="flex items-center justify-center text-emerald-600 text-2xl mt-1">
              <FaRobot />
            </span>
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#4c889a] mb-1">MediPal</div>
              <div className="bg-gradient-to-br from-emerald-50 to-white text-[#222] rounded-2xl px-4 py-3 text-sm shadow-md mb-2 flex items-center gap-2 max-w-[320px] md:max-w-[380px] border-none">
                <span className="inline-block">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0s]"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s] ml-1"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s] ml-1"></span>
                </span>
                <span>Thinking…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="absolute left-0 right-0 bottom-0 flex items-center gap-2 px-2 md:px-4 pb-2 pt-2 bg-transparent box-border border-none shadow-none" style={{height: '64px'}}>
        <Input
          type="text"
          placeholder="Type your message…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-br from-white/80 to-emerald-50/80 border-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-white rounded-2xl px-5 py-3 text-base box-border shadow-lg transition-all duration-200 outline-none"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#2d7bb6] hover:bg-[#25609a] rounded-2xl px-6 py-3 text-base font-semibold flex items-center transition-transform duration-150 active:scale-95 group shadow-md border-none"
        >
          <span className="mr-1">Send</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-active:scale-110">
            <FaRegPaperPlane className="animate-float" />
          </span>
        </Button>
      </form>
      {error && (
        <div className="text-red-600 text-sm mt-2 px-4">{error}</div>
      )}
    </div>
  )
}

// Add this to your global CSS or Tailwind config for the animated paper plane
// .animate-float { animation: float 1.2s infinite alternate; }
// @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-4px); } }
