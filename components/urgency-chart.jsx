"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChartIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", green: 4, yellow: 2, red: 0 },
  { name: "Feb", green: 3, yellow: 1, red: 1 },
  { name: "Mar", green: 5, yellow: 3, red: 0 },
  { name: "Apr", green: 7, yellow: 4, red: 1 },
  { name: "May", green: 2, yellow: 2, red: 0 },
]

export function UrgencyChart() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChartIcon className="h-5 w-5 text-emerald-600" />
        <h3 className="text-sm font-medium text-slate-800 font-heading">Urgency Breakdown</h3>
      </div>

      <div className="h-64">
        <ChartContainer>
          <Chart>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
                <Bar dataKey="green" stackId="a" fill="#4ade80" radius={[0, 0, 0, 0]} />
                <Bar dataKey="yellow" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} />
                <Bar dataKey="red" stackId="a" fill="#f87171" radius={[4, 4, 0, 0]} />
                <ChartTooltip
                  content={<ChartTooltipContent className="bg-white border border-slate-200 shadow-md" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </ChartContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-green-400"></span>
          <span className="text-xs text-slate-600">Self Care</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-amber-400"></span>
          <span className="text-xs text-slate-600">Clinic Visit</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-red-400"></span>
          <span className="text-xs text-slate-600">Emergency</span>
        </div>
      </div>
    </Card>
  )
}
