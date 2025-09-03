"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DesignOptimization() {
  const optimizations = [
    { concept: "Energy Efficiency Upgrade", impact: "High", cost: "$25,000" },
    { concept: "Smart Home Automation", impact: "Medium", cost: "$15,000" },
    { concept: "Space Utilization Redesign", impact: "High", cost: "$40,000" },
  ]

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-600">
          <Brain className="h-5 w-5" /> Design Optimization
        </CardTitle>
        <CardDescription>AI-driven property improvement suggestions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimizations.map((item, i) => (
          <div key={i} className="p-4 rounded-lg border bg-purple-50 border-purple-200">
            <h4 className="font-semibold text-purple-800">{item.concept}</h4>
            <p className="text-sm text-gray-600">Impact: {item.impact}</p>
            <p className="text-sm text-gray-600">Estimated Cost: {item.cost}</p>
          </div>
        ))}

        <Button className="w-full bg-gradient-to-r from-purple-600 to-gray-800">
          Generate Optimization Report
        </Button>
      </CardContent>
    </Card>
  )
}
