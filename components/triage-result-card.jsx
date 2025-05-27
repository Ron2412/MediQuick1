import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

export function TriageResultCard({ urgency, reason, tip, flat }) {
  // Configure based on urgency level
  const config = {
    green: {
      icon: CheckCircle,
      title: "Self Care Recommended",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-500",
      textColor: "text-green-800",
      badgeColor: "bg-green-100 text-green-700",
    },
    yellow: {
      icon: AlertTriangle,
      title: "Clinic Visit Recommended",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-500",
      textColor: "text-amber-800",
      badgeColor: "bg-amber-100 text-amber-700",
    },
    red: {
      icon: AlertCircle,
      title: "Emergency Care Needed",
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-500",
      textColor: "text-red-800",
      badgeColor: "bg-red-100 text-red-700",
    },
  }

  const { icon: Icon, title, color, iconColor, textColor, badgeColor } = config[urgency]

  if (flat) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span className={`font-semibold text-base ${textColor}`}>{title}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Reason:</p>
          <p className="text-sm text-slate-600">{reason}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${badgeColor}`}>
            {urgency === "green" && <span className="h-2 w-2 rounded-full bg-green-500"></span>}
            {urgency === "yellow" && <span className="h-2 w-2 rounded-full bg-amber-500"></span>}
            {urgency === "red" && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
            <span className="text-xs font-medium">
              {urgency === "green" && "Low Urgency"}
              {urgency === "yellow" && "Medium Urgency"}
              {urgency === "red" && "High Urgency"}
            </span>
          </div>
          <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">View Details</button>
        </div>
      </div>
    )
  }

  return (
    <Card className={`border-2 ${color}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 font-heading">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span className={textColor}>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-700">Reason:</p>
            <p className="text-sm text-slate-600">{reason}</p>
          </div>

          <div className="flex justify-between">
            <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${badgeColor}`}>
              {urgency === "green" && <span className="h-2 w-2 rounded-full bg-green-500"></span>}
              {urgency === "yellow" && <span className="h-2 w-2 rounded-full bg-amber-500"></span>}
              {urgency === "red" && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
              <span className="text-xs font-medium">
                {urgency === "green" && "Low Urgency"}
                {urgency === "yellow" && "Medium Urgency"}
                {urgency === "red" && "High Urgency"}
              </span>
            </div>

            <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">View Details</button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
