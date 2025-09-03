"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

type Props = {
  estimate: number
  range?: { min: number; max: number }
}

export default function EstimateResults({ estimate, range }: Props) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-accent" />
          Estimate Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-center">
        <p className="text-sm text-muted-foreground">Estimated Project Cost</p>
        <p className="text-3xl font-bold text-primary">
          ${estimate.toLocaleString()}
        </p>

        {range && (
          <p className="text-sm text-muted-foreground">
            Range: ${range.min.toLocaleString()} – ${range.max.toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
