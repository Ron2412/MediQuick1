import { MediQuickHeader } from "@/components/header"
import { ChatbotPanel } from "@/components/chatbot-panel"
import { HealthScorePanel } from "@/components/health-score-panel"
import { TriageResultCard } from "@/components/triage-result-card"
import { Dashboard } from "@/components/dashboard"
import { HealthTip } from "@/components/health-tip"
import { NearbyDoctors } from "@/components/nearby-doctors"

export default function AppPage() {
  // Use the same entries as Dashboard for demo; ideally, this should be shared state or fetched
  const previousEntries = [
    { date: "May 18, 2025", symptom: "Headache and dizziness", urgency: "green" },
    { date: "May 10, 2025", symptom: "Chest pain after exercise", urgency: "yellow" },
    { date: "Apr 28, 2025", symptom: "Skin rash and itching", urgency: "green" },
    { date: "Apr 15, 2025", symptom: "Severe abdominal pain", urgency: "red" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <MediQuickHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChatbotPanel />
          <div className="space-y-6">
            <HealthScorePanel history={previousEntries} />
            <TriageResultCard
              urgency="yellow"
              reason="Persistent fever and cough for 3+ days"
              tip="Stay hydrated and consider scheduling a clinic visit within 24 hours."
            />
          </div>
        </div>

        <Dashboard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <HealthTip />
          </div>
          <div className="md:col-span-2">
            <NearbyDoctors />
          </div>
        </div>
      </main>
    </div>
  )
}
