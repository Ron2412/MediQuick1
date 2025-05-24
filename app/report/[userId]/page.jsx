"use client"
import { useParams } from "next/navigation"

const mockUser = {
  id: "demo123",
  name: "John Doe",
  dob: "1990-05-15",
  email: "john.doe@email.com",
  bloodGroup: "O+",
  allergies: "Peanuts",
  photoURL: "/placeholder-user.jpg",
  recentEntries: [
    { date: "May 18, 2025", symptom: "Headache and dizziness", urgency: "green", notes: "Mild, resolved with rest" },
    { date: "May 10, 2025", symptom: "Chest pain after exercise", urgency: "yellow", notes: "Advised clinic visit" },
    { date: "Apr 28, 2025", symptom: "Skin rash and itching", urgency: "green", notes: "No medication needed" },
    { date: "Apr 15, 2025", symptom: "Severe abdominal pain", urgency: "red", notes: "Emergency, referred to ER" },
  ]
}

export default function HealthReportPage() {
  const { userId } = useParams()
  const user = mockUser
  const today = new Date().toLocaleDateString()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-2xl font-bold text-emerald-700">MediQuick Health Clinic</div>
            <div className="text-xs text-slate-500">123 Wellness Ave, Healthy City</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-800">Medical Report</div>
            <div className="text-xs text-slate-500">Report Date: {today}</div>
          </div>
        </div>
        {/* Patient Info */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full border-2 border-emerald-400"
          />
          <div>
            <div className="font-semibold text-slate-800 text-lg">{user.name}</div>
            <div className="text-sm text-slate-600">Patient ID: {user.id}</div>
            <div className="text-sm text-slate-600">DOB: {user.dob}</div>
            <div className="text-sm text-slate-600">Blood Group: <span className="font-semibold">{user.bloodGroup}</span></div>
            <div className="text-sm text-slate-600">Allergies: <span className="font-semibold">{user.allergies}</span></div>
            <div className="text-sm text-slate-600">Email: {user.email}</div>
          </div>
        </div>
        {/* Summary/Diagnosis */}
        <div className="mb-6">
          <div className="font-semibold text-emerald-700 mb-1">Summary / Diagnosis</div>
          <div className="text-sm text-slate-700 bg-emerald-50 rounded p-3">
            Recent symptoms mostly mild, except for one emergency event. Advised to monitor symptoms and follow up as needed.
          </div>
        </div>
        {/* Symptom Table */}
        <div className="mb-6">
          <div className="font-semibold text-emerald-700 mb-2">Symptom & Visit History</div>
          <table className="w-full text-sm border border-slate-200 rounded overflow-hidden">
            <thead className="bg-emerald-100">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Symptom</th>
                <th className="p-2 text-left">Urgency</th>
                <th className="p-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {user.recentEntries.map((entry, idx) => (
                <tr key={idx} className="border-t border-slate-100">
                  <td className="p-2">{entry.date}</td>
                  <td className="p-2">{entry.symptom}</td>
                  <td className={`p-2 font-bold ${
                    entry.urgency === "green" ? "text-green-600" :
                    entry.urgency === "yellow" ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {entry.urgency === "green" && "Self Care"}
                    {entry.urgency === "yellow" && "Clinic Visit"}
                    {entry.urgency === "red" && "Emergency"}
                  </td>
                  <td className="p-2">{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="text-xs text-slate-500 mt-8 border-t pt-4">
          <div>
            <span className="font-semibold">Disclaimer:</span> This report is generated for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </div>
          <div className="mt-2">Doctor: <span className="font-semibold">Dr. AI Assistant</span></div>
        </div>
      </div>
    </div>
  )
} 