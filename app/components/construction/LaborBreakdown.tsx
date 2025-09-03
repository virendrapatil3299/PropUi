"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

type Labor = {
  role: string
  hourly: number
  demand: string
}

type Props = {
  laborCosts: Labor[]
}

export default function LaborBreakdown({ laborCosts }: Props) {
  return (
    <Card className="glass-card mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          Labor Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {laborCosts.map((labor, i) => (
            <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">{labor.role}</p>
              <p className="text-xl font-bold text-primary">${labor.hourly}/hr</p>
              <p className="text-xs">{labor.demand}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
