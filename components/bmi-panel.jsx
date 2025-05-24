import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export function BMIPanel() {
  const bmi = 23.4
  const status = "Normal"

  // Determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "underweight":
        return "text-blue-500 bg-blue-50"
      case "normal":
        return "text-green-500 bg-green-50"
      case "overweight":
        return "text-yellow-500 bg-yellow-50"
      case "obese":
        return "text-red-500 bg-red-50"
      default:
        return "text-slate-500 bg-slate-50"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 font-heading">
          <Scale className="h-5 w-5 text-emerald-600" />
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-800">{bmi.toFixed(1)}</p>
            <p className="text-sm text-slate-500">Body Mass Index</p>
          </div>
          <div className={`px-3 py-1 rounded-full ${getStatusColor(status)}`}>
            <span className="text-sm font-medium">{status}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div className="w-1/4 bg-blue-400"></div>
              <div className="w-1/4 bg-green-400"></div>
              <div className="w-1/4 bg-yellow-400"></div>
              <div className="w-1/4 bg-red-400"></div>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
