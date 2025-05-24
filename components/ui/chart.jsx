import * as React from "react"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef(({ className, ...props }, ref) => {
  return <div className={cn("relative", className)} ref={ref} {...props} />
})
ChartContainer.displayName = "ChartContainer"

const Chart = React.forwardRef(({ className, ...props }, ref) => {
  return <div className={cn("relative", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartTooltip = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 flex h-auto w-auto items-center justify-center overflow-hidden text-sm text-muted-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef(({ className, ...props }, ref) => {
  return <div className={cn("bg-popover p-2 shadow-md", className)} ref={ref} {...props} />
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent }
