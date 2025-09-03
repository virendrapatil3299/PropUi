"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Scenario = {
  name: string
  cost: string
  duration: string
  description: string
}

type Props = {
  scenarios: Scenario[]
}

export default function ScenarioCards({ scenarios }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scenarios.map((s, i) => (
        <Card key={i} className="glass-card hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{s.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-bold">{s.cost}</p>
            <p className="text-sm text-muted-foreground">Duration: {s.duration}</p>
            <p className="text-sm">{s.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
