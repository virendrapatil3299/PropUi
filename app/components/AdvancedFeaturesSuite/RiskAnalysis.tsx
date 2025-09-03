"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function RiskAnalysis() {
  const risks = [
    { factor: "Market Volatility", score: 72 },
    { factor: "Regulatory Risk", score: 35 },
    { factor: "Tenant Default", score: 55 },
    { factor: "Construction Delays", score: 82 },
  ]

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-600">
          <AlertTriangle className="h-5 w-5" /> Risk Analysis
        </CardTitle>
        <CardDescription>AI-powered investment risk profiling</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {risks.map((risk, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{risk.factor}</span>
              <span className={risk.score > 70 ? "text-red-600" : risk.score > 50 ? "text-yellow-600" : "text-green-600"}>
                {risk.score}%
              </span>
            </div>
            <Progress value={risk.score} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
