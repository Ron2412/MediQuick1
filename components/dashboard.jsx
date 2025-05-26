import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Clock, History } from "lucide-react"
import { UrgencyChart } from "@/components/urgency-chart"

export function Dashboard({ latestUrgency }) {
  const previousEntries = [
    { date: "May 18, 2025", symptom: "Headache and dizziness", urgency: "green" },
    { date: "May 10, 2025", symptom: "Chest pain after exercise", urgency: "yellow" },
    { date: "Apr 28, 2025", symptom: "Skin rash and itching", urgency: "green" },
    { date: "Apr 15, 2025", symptom: "Severe abdominal pain", urgency: "red" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 font-heading">
          <History className="h-5 w-5 text-emerald-600" />
          Your Health Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {latestUrgency === "yellow" && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 flex items-center gap-3 rounded">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold uppercase tracking-wide text-sm">Clinic Visit Recommended</span>
          </div>
        )}
        <Tabs defaultValue="history">
          <TabsList className="mb-4">
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Recent History</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <div className="space-y-2">
              {previousEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {entry.urgency === "green" && <span className="h-3 w-3 rounded-full bg-green-500"></span>}
                    {entry.urgency === "yellow" && <span className="h-3 w-3 rounded-full bg-amber-500"></span>}
                    {entry.urgency === "red" && <span className="h-3 w-3 rounded-full bg-red-500"></span>}
                    <div>
                      <p className="text-sm font-medium text-slate-800">{entry.symptom}</p>
                      <p className="text-xs text-slate-500">{entry.date}</p>
                    </div>
                  </div>
                  <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">View</button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <UrgencyChart />
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-100">
                <h3 className="text-sm font-medium text-slate-800 mb-2 font-heading">Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Total Entries</span>
                    <span className="text-xs font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Self Care (Green)</span>
                    <span className="text-xs font-medium">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Clinic Visit (Yellow)</span>
                    <span className="text-xs font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Emergency (Red)</span>
                    <span className="text-xs font-medium">1</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-slate-100">
              <p className="text-slate-500">Calendar view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
