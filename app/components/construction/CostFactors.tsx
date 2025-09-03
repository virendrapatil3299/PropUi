"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"

type Factor = {
  factor: string
  impact: string
}

type Props = {
  costFactors: Factor[]
}

export default function CostFactors({ costFactors }: Props) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" />
          Regional Cost Factors
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {costFactors.map((factor, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span>{factor.factor}</span>
            <span className="font-medium">{factor.impact}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
