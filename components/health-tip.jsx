import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LightbulbIcon } from "lucide-react"

export function HealthTip() {
  return (
    <Card className="h-full bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 font-heading">
          <LightbulbIcon className="h-5 w-5 text-emerald-600" />
          Health Tip of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            <span className="font-medium">Stay Hydrated:</span> Drinking enough water is crucial for maintaining energy
            levels, supporting digestion, and regulating body temperature. Aim for 8 glasses (about 2 liters) of water
            daily.
          </p>

          <div className="bg-white p-3 rounded-lg border border-emerald-100">
            <h4 className="text-sm font-medium text-slate-800 mb-1 font-heading">Quick Facts:</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Water makes up about 60% of your body weight</li>
              <li>• Even mild dehydration can affect your mood and energy</li>
              <li>• Thirst is often a late indicator of dehydration</li>
            </ul>
          </div>

          <button className="w-full py-2 text-xs font-medium text-emerald-600 hover:text-emerald-800 bg-white rounded-md border border-emerald-100">
            View More Health Tips
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
