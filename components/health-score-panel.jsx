import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HealthScorePanel({ history }) {
  // Simple scoring: start at 100, subtract for each yellow/red, small for green
  let score = 100
  let red = 0, yellow = 0, green = 0
  history.forEach(entry => {
    if (entry.urgency === "red") { score -= 30; red++ }
    else if (entry.urgency === "yellow") { score -= 15; yellow++ }
    else if (entry.urgency === "green") { score -= 5; green++ }
  })
  if (score < 0) score = 0

  let color = "text-green-600"
  if (score < 60) color = "text-red-600"
  else if (score < 80) color = "text-yellow-600"

  let summary = "Your health is looking good!"
  if (score < 60) summary = "You have several urgent symptoms. Please seek medical advice."
  else if (score < 80) summary = "Some symptoms may need attention. Monitor your health closely."

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Health Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <span className={`text-4xl font-bold ${color}`}>{score}</span>
          <div>
            <div className="font-medium">{summary}</div>
            <div className="text-xs text-slate-500">
              {green} self-care, {yellow} clinic, {red} emergency entries
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 