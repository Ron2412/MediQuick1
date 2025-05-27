"use client"
import { useState } from "react"
import { ChatbotPanel } from "@/components/chatbot-panel"
import { TriageResultCard } from "@/components/triage-result-card"
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

export default function ChatPage() {
  const [triage, setTriage] = useState(null)
  return (
    <div className="min-h-screen bg-[#f4f8fa]">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto pt-8 gap-8 items-start min-h-[calc(100vh-80px)] box-border">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col justify-stretch box-border w-full">
          <h1 className="text-3xl font-bold mb-6 text-[#0d181b]">Health Chat</h1>
          <ChatbotPanel onTriageResult={result => {
            if (typeof result === 'string') {
              setTriage({ ...defaultTriage, reason: result })
            } else {
              setTriage(result)
            }
          }} />
         </div>
        {/* Sidebar */}
        <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-8 sticky top-8 self-start box-border max-h-[calc(100vh-100px)] overflow-auto">
          <section className="rounded-3xl bg-gradient-to-br from-white via-emerald-50 to-emerald-100 shadow-xl p-7 flex flex-col items-center border-0 transition-all duration-300">
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
          <section className="rounded-2xl bg-gradient-to-br from-white via-emerald-50 to-emerald-100 shadow-lg p-6 flex flex-col box-border border-0">
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
    </div>
  )
}
