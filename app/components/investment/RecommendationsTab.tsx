"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const portfolioRecommendations = [
  {
    property: "Downtown Condo",
    strategy: "Buy & Hold",
    investment: "$850,000",
    projectedReturn: "$127,500",
    confidence: 94,
    status: "recommended",
  },
  {
    property: "Suburban House",
    strategy: "Fix & Flip",
    investment: "$450,000",
    projectedReturn: "$135,000",
    confidence: 82,
    status: "consider",
  },
  {
    property: "Multi-family Unit",
    strategy: "BRRRR",
    investment: "$1,200,000",
    projectedReturn: "$240,000",
    confidence: 88,
    status: "recommended",
  },
]

export function RecommendationsTab() {
  return (
    <div className="space-y-4">
      {portfolioRecommendations.map((rec, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{rec.property}</h3>
                  <Badge variant={rec.status === "recommended" ? "default" : "secondary"}>
                    {rec.status === "recommended" ? "Recommended" : "Consider"}
                  </Badge>
                  <Badge variant="outline">{rec.strategy}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Investment Required</p>
                    <p className="font-semibold text-primary">{rec.investment}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Projected Return</p>
                    <p className="font-semibold text-accent">{rec.projectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">AI Confidence</p>
                    <p className="font-semibold">{rec.confidence}%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Add to Portfolio</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
