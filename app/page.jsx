"use client"
import { useState } from "react"
import { ChatbotPanel } from "@/components/chatbot-panel"
import { TriageResultCard } from "@/components/triage-result-card"
import { NearbyDoctors } from "@/components/nearby-doctors"
import { FaCheckCircle } from "react-icons/fa"

const defaultTriage = {
  urgency: "green",
  reason: "No recent triage. Start a chat to get a recommendation!",
  tip: "Describe your symptoms to get started."
}

// Health Score mock data
const healthScore = 85;
const healthScoreText = healthScore > 80 ? "Excellent" : healthScore > 60 ? "Good" : "Needs Attention";
const isExcellent = healthScore > 80;

// Helper to extract triage info from AI response
function parseTriageResult(aiText) {
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

export default function ChatPage() {
  const [triage, setTriage] = useState(null)
  return (
    <div className="min-h-screen bg-[#f4f8fa] flex flex-col items-center">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto pt-8 gap-8 items-start min-h-[calc(100vh-80px)] box-border w-full">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col justify-stretch box-border w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-none p-6 md:p-8 transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-[#0d181b]">Symptom Analyzer</h1>
          <ChatbotPanel onTriageResult={result => {
            setTriage(parseTriageResult(result))
          }} />
        </div>
        {/* Sidebar */}
        <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6 md:gap-8 box-border max-h-full md:mt-0 mt-8">
          <section className="rounded-2xl bg-white/70 backdrop-blur-md p-7 flex flex-col items-center border-0 shadow-none transition-all duration-300">
            <div className="flex flex-col items-center w-full">
              <div className="relative flex flex-col items-center justify-center w-full">
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-green-100 via-emerald-100 to-white blur-xl opacity-80"></div>
                </div>
                <svg width="110" height="110" viewBox="0 0 110 110" style={{overflow: 'visible'}} aria-label="Health Score Progress" className="relative z-10 drop-shadow-md">
                  <defs>
                    <linearGradient id="healthScoreGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="55" cy="55" r="48" stroke="#e7f0f3" strokeWidth="10" fill="none" />
                  <circle
                    cx="55" cy="55" r="48"
                    stroke="url(#healthScoreGradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={(1 - healthScore / 100) * 2 * Math.PI * 48}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)' }}
                    filter="url(#glow)"
                  />
                  <text x="50%" y="54%" textAnchor="middle" fontSize="3.2rem" fontWeight="bold" fill="#059669" dy=".3em" style={{fontFamily:'inherit'}}>{healthScore}</text>
                </svg>
                {isExcellent && (
                  <span className="absolute right-2 bottom-2 z-20 animate-pulse">
                    <FaCheckCircle className="text-green-500" size={28} />
                  </span>
                )}
              </div>
              <span className="mt-4 text-xl font-bold text-[#059669] tracking-tight transition-all duration-300" style={{letterSpacing: '-0.01em'}}>{healthScoreText}</span>
              <p className="text-xs text-[#4c889a] text-center mt-2 max-w-[220px] leading-relaxed">Your current health score based on recent activity and AI insights.</p>
            </div>
          </section>
          <section className="rounded-2xl bg-white/70 backdrop-blur-md p-6 flex flex-col box-border border-0 shadow-none">
            <h2 className="font-bold text-lg text-[#0d181b] mb-4">Triage Result</h2>
            <div>
              <TriageResultCard
                urgency={triage?.urgency || defaultTriage.urgency}
                reason={triage?.reason || defaultTriage.reason}
                tip={triage?.tip || defaultTriage.tip}
                flat
              />
            </div>
          </section>
        </aside>
      </div>
      {/* Separated Nearby Doctors section below main chat/dashboard */}
      <div className="max-w-4xl w-full mx-auto mb-8 px-2 md:px-0 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-emerald-200 via-emerald-100 to-blue-100 opacity-70 mb-2" />
          <h2 className="text-lg font-semibold text-[#0d181b] tracking-tight mb-1">Nearby Doctors</h2>
        </div>
        <NearbyDoctors />
      </div>
    </div>
  )
}
