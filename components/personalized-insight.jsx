"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export function PersonalizedInsight({ history }) {
  const [insight, setInsight] = useState("")

  useEffect(() => {
    async function fetchInsight() {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Here is a user's recent symptom and triage history: ${JSON.stringify(history)}. Generate a short, friendly, and actionable health insight or tip for them. Use bullet points if possible.`
            }
          ]
        })
      })
      const data = await res.json()
      setInsight(data.text)
    }
    if (history && history.length > 0) fetchInsight()
  }, [history])

  if (!insight) return null

  // Split insight into bullet points if possible
  const bullets = insight
    .split(/\n|•|-/)
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return (
    <Card className="mb-6 bg-gradient-to-r from-emerald-100 to-emerald-50 shadow-lg rounded-xl animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="bg-emerald-400 rounded-full p-2 flex items-center justify-center">
          <Lightbulb className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg font-bold text-emerald-900">Personalized Health Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1 text-slate-800">
          {bullets.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
} 