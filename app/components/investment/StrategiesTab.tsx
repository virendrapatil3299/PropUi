"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle } from "lucide-react"

const strategies = [
  {
    id: 1,
    name: "Buy & Hold",
    description: "Long-term rental income strategy",
    riskLevel: "Low",
    expectedROI: "12-15%",
    timeframe: "5-10 years",
    confidence: 92,
    pros: ["Steady cash flow", "Tax benefits", "Appreciation potential"],
    cons: ["Property management", "Market volatility", "Liquidity concerns"],
  },
  {
    id: 2,
    name: "Fix & Flip",
    description: "Renovation and quick resale",
    riskLevel: "High",
    expectedROI: "20-35%",
    timeframe: "6-12 months",
    confidence: 78,
    pros: ["Quick returns", "Active involvement", "Market timing"],
    cons: ["High risk", "Capital intensive", "Market dependent"],
  },
  {
    id: 3,
    name: "BRRRR Strategy",
    description: "Buy, Rehab, Rent, Refinance, Repeat",
    riskLevel: "Medium",
    expectedROI: "18-25%",
    timeframe: "2-3 years",
    confidence: 85,
    pros: ["Scalable", "Leverage benefits", "Multiple income streams"],
    cons: ["Complex process", "Financing requirements", "Market timing"],
  },
]

export function StrategiesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {strategies.map((strategy) => (
        <Card key={strategy.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{strategy.name}</CardTitle>
              <Badge
                variant={
                  strategy.riskLevel === "Low"
                    ? "secondary"
                    : strategy.riskLevel === "Medium"
                      ? "default"
                      : "destructive"
                }
              >
                {strategy.riskLevel} Risk
              </Badge>
            </div>
            <CardDescription>{strategy.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Expected ROI</p>
                <p className="font-semibold text-primary">{strategy.expectedROI}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Timeframe</p>
                <p className="font-semibold">{strategy.timeframe}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">AI Confidence</span>
                <span className="text-sm font-semibold">{strategy.confidence}%</span>
              </div>
              <Progress value={strategy.confidence} />
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm text-accent mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Pros
                </h5>
                <ul className="text-xs space-y-1">
                  {strategy.pros.map((pro, i) => (
                    <li key={i} className="text-muted-foreground">• {pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm text-destructive mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Cons
                </h5>
                <ul className="text-xs space-y-1">
                  {strategy.cons.map((con, i) => (
                    <li key={i} className="text-muted-foreground">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              Learn More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
