"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ScenariosTab() {
  const scenarios = [
    {
      name: "Basic",
      cost: "$400,000",
      duration: "8 months",
      description: "Standard materials, minimal customization.",
    },
    {
      name: "Standard",
      cost: "$450,000",
      duration: "10 months",
      description: "Balanced quality and cost efficiency.",
    },
    {
      name: "Premium",
      cost: "$550,000",
      duration: "12 months",
      description: "High-end materials, luxury finishes.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scenarios.map((scenario, i) => (
        <Card key={i} className="glass-card">
          <CardHeader>
            <CardTitle>{scenario.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Cost:</strong> {scenario.cost}</p>
            <p><strong>Duration:</strong> {scenario.duration}</p>
            <p className="text-muted-foreground">{scenario.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
