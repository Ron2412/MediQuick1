"use client"
import { useState } from "react"
import { ChatbotPanel } from "@/components/chatbot-panel"
import { TriageResultCard } from "@/components/triage-result-card"

// Mock data for sidebar
const tracker = {
  steps: 8200,
  sleep: "7h 30m",
  heartRate: 72,
  activities: [
    { icon: "🏃‍♂️", label: "5.2 km", desc: "Morning Run" },
    { icon: "🧘‍♂️", label: "60 min", desc: "Yoga Session" },
    { icon: "🍲", label: "500 kcal", desc: "Healthy Meal" },
  ]
}

const defaultTriage = {
  urgency: "green",
  reason: "No recent triage. Start a chat to get a recommendation!",
  tip: "Describe your symptoms to get started."
}

// Health Score mock data
const healthScore = 85;
const healthScoreText = healthScore > 80 ? "Excellent" : healthScore > 60 ? "Good" : "Needs Attention";
const healthScoreColor = healthScore > 80 ? "from-green-400 to-emerald-500" : healthScore > 60 ? "from-yellow-300 to-yellow-500" : "from-red-400 to-pink-500";

export default function ChatPage() {
  const [triage, setTriage] = useState(null)
  return (
    <div className="min-h-screen bg-[#f4f8fa]">
      <div className="flex items-center justify-between px-8 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="size-6"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path></svg></div>
          <span className="font-bold text-xl text-[#0d181b]">HealthAI</span>
        </div>
        <nav className="flex gap-8 text-[#0d181b] font-medium">
          <a href="#" className="hover:text-emerald-600">Home</a>
          <a href="#" className="hover:text-emerald-600">Chat</a>
          <a href="#" className="hover:text-emerald-600">Tracker</a>
          <a href="#" className="hover:text-emerald-600">Profile</a>
        </nav>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("/placeholder-user.jpg")' }}></div>
      </div>
      <div className="flex flex-row max-w-7xl mx-auto pt-8 gap-8 items-start min-h-[calc(100vh-80px)] box-border">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col justify-stretch box-border">
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
        <aside className="w-[340px] flex-shrink-0 flex flex-col gap-8 sticky top-8 self-start box-border">
          <section className="rounded-2xl bg-[#f8fbfc] border border-[#e7f0f3] p-5 flex flex-col items-center shadow-sm relative">
            <h2 className="font-bold text-lg text-[#0d181b] mb-4">Health Score</h2>
            <div className="relative flex flex-col items-center justify-center mb-2">
              <svg width="110" height="110" viewBox="0 0 110 110" style={{overflow: 'visible'}}>
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
                <text x="50%" y="54%" textAnchor="middle" fontSize="2.5rem" fontWeight="bold" fill="#059669" dy=".3em">{healthScore}</text>
              </svg>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-[#059669]">{healthScoreText}</span>
            </div>
            <p className="text-xs text-[#4c889a] text-center">Your current health score based on recent activity and AI insights.</p>
          </section>
          <section className="rounded-2xl bg-[#f8fbfc] border border-[#e7f0f3] p-5 flex flex-col shadow-sm box-border">
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
