"use client"
import { HealthCard } from "@/components/health-card"
import { HealthScorePanel } from "@/components/health-score-panel"
import { ChatbotPanel } from "@/components/chatbot-panel"
import { useState } from "react"

const mockUser = {
  id: "demo123",
  name: "John Doe",
  email: "john.doe@email.com",
  photoURL: "/placeholder-user.jpg",
  bloodGroup: "O+",
  allergies: "Peanuts",
  recentEntries: [
    { date: "May 18, 2025", symptom: "Headache and dizziness", urgency: "green", notes: "Mild, resolved with rest" },
    { date: "May 10, 2025", symptom: "Chest pain after exercise", urgency: "yellow", notes: "Advised clinic visit" },
    { date: "Apr 28, 2025", symptom: "Skin rash and itching", urgency: "green", notes: "No medication needed" },
    { date: "Apr 15, 2025", symptom: "Severe abdominal pain", urgency: "red", notes: "Emergency, referred to ER" },
  ]
}

export default function ProfilePage() {
  const [recentTriageResults, setRecentTriageResults] = useState([]);
  const [latestUrgency, setLatestUrgency] = useState(null);

  // Handler to add new triage result (keep only last 10 for score)
  const handleTriageResult = (triage) => {
    setRecentTriageResults(prev => {
      const updated = [...prev, { urgency: triage.urgency }];
      return updated.slice(-10); // keep last 10
    });
    setLatestUrgency(triage.urgency);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f8fbfc] py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-200 p-0">
        <div className="flex flex-wrap justify-between gap-3 p-8 pb-2">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#0d181b] tracking-light text-[32px] font-bold leading-tight">Health Score</p>
            <p className="text-[#4c889a] text-sm font-normal leading-normal">Based on your recent entries</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 px-8 pb-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#e7f0f3]">
            <HealthScorePanel history={recentTriageResults.length ? recentTriageResults : mockUser.recentEntries} />
          </div>
        </div>
        <h2 className="text-[#0d181b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-8 pb-3 pt-5">Recent Activity</h2>
        <div className="grid grid-cols-[40px_1fr] gap-x-2 px-8 pb-8">
          {/* Timeline for recent activity */}
          {mockUser.recentEntries.map((entry, idx) => (
            <>
              <div className="flex flex-col items-center gap-1 pt-3">
                <div className={`text-[#0d181b]`}>
                  {/* Icon based on urgency */}
                  {entry.urgency === "green" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M5 13l4 4L19 7" /></svg>
                  )}
                  {entry.urgency === "yellow" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                  {entry.urgency === "red" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                </div>
                {idx < mockUser.recentEntries.length - 1 && <div className="w-[1.5px] bg-[#cfe2e7] h-2 grow"></div>}
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#0d181b] text-base font-medium leading-normal">{entry.symptom}</p>
                <p className="text-[#4c889a] text-base font-normal leading-normal">{entry.notes}</p>
                <p className="text-xs text-slate-400">{entry.date}</p>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-start px-8 pb-8">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Health Card</h2>
          <div className="w-full max-w-md">
            <HealthCard user={mockUser} />
          </div>
        </div>
      </div>
    </div>
  )
} 