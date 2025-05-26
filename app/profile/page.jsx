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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 tracking-tight text-center mb-10">User Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center md:items-start">
            {/* Clinic Visit Banner */}
            {latestUrgency === "yellow" && (
              <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 flex items-center gap-3 rounded">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold uppercase tracking-wide text-sm">Clinic Visit Recommended</span>
              </div>
            )}
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Health Score</h2>
            <HealthScorePanel history={recentTriageResults.length ? recentTriageResults : mockUser.recentEntries} />
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Health Card</h2>
            <div className="w-full max-w-md"> {/* Ensure HealthCard doesn't stretch too much */}
              <HealthCard user={mockUser} />
            </div>
            <div className="w-full mt-8">
              {/* ChatbotPanel removed as per request */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 