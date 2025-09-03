"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, AlertCircle, CheckCircle, Clock } from "lucide-react"

const recommendations = [
  {
    id: 1,
    type: "Buy Opportunity",
    title: "Undervalued Property Detected",
    description: "123 Oak Street is priced 15% below market value based on comparable analysis",
    confidence: 94,
    priority: "high",
    action: "Consider immediate purchase",
    timeframe: "7 days",
    potentialReturn: "$127,500",
    riskLevel: "Low",
    factors: ["Location score: 9.2/10", "Recent renovations", "Below market price", "High rental demand"],
  },
  {
    id: 2,
    type: "Sell Recommendation",
    title: "Peak Market Timing",
    description: "Your downtown condo has reached optimal selling price based on market trends",
    confidence: 87,
    priority: "medium",
    action: "List within 30 days",
    timeframe: "30 days",
    potentialReturn: "$95,000",
    riskLevel: "Medium",
    factors: ["Market peak indicators", "Seasonal trends", "Inventory levels", "Interest rate forecast"],
  },
  {
    id: 3,
    type: "Hold Strategy",
    title: "Long-term Appreciation",
    description: "Suburban property shows strong long-term growth potential, recommend holding",
    confidence: 91,
    priority: "low",
    action: "Continue holding",
    timeframe: "2-3 years",
    potentialReturn: "$185,000",
    riskLevel: "Low",
    factors: [
      "Development plans nearby",
      "School district ratings",
      "Population growth",
      "Infrastructure improvements",
    ],
  },
  {
    id: 4,
    type: "Refinance Alert",
    title: "Rate Optimization Opportunity",
    description: "Current rates are 0.75% lower than your existing mortgage rate",
    confidence: 96,
    priority: "high",
    action: "Refinance immediately",
    timeframe: "14 days",
    potentialReturn: "$45,000",
    riskLevel: "Very Low",
    factors: ["Rate differential", "Credit score improvement", "Property appreciation", "Closing cost analysis"],
  },
]

const mlInsights = [
  {
    category: "Market Prediction",
    insight: "Property values expected to increase 8-12% over next 12 months",
    confidence: 89,
    impact: "High",
  },
  {
    category: "Investment Timing",
    insight: "Optimal buying window closing in next 45 days due to seasonal trends",
    confidence: 92,
    impact: "Medium",
  },
  {
    category: "Risk Assessment",
    insight: "Current portfolio risk level is optimal for your investment profile",
    confidence: 85,
    impact: "Low",
  },
  {
    category: "Opportunity Detection",
    insight: "3 new undervalued properties identified in your target areas",
    confidence: 88,
    impact: "High",
  },
]

export function MLRecommendations() {
  return (
    <div className="space-y-6">
      {/* AI Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>AI Recommendation Engine</CardTitle>
                <CardDescription>Machine learning powered insights updated in real-time</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Live Analysis</span>
              </div>
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                4 Active Recommendations
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      variant={
                        rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {rec.priority === "high" ? (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      ) : rec.priority === "medium" ? (
                        <Clock className="h-3 w-3 mr-1" />
                      ) : (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {rec.type}
                    </Badge>
                    <Badge variant="outline">{rec.riskLevel} Risk</Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{rec.title}</CardTitle>
                  <CardDescription className="text-base">{rec.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{rec.potentialReturn}</div>
                  <div className="text-sm text-muted-foreground">Potential Return</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Recommended Action</p>
                  <p className="font-semibold">{rec.action}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Frame</p>
                  <p className="font-semibold">{rec.timeframe}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <Progress value={rec.confidence} className="flex-1" />
                    <span className="text-sm font-semibold">{rec.confidence}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Key Factors</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rec.factors.map((factor, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-accent" />
                      <span className="text-muted-foreground">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button size="sm">Take Action</Button>
                <Button variant="outline" size="sm">
                  View Analysis
                </Button>
                <Button variant="ghost" size="sm">
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ML Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Machine Learning Insights
          </CardTitle>
          <CardDescription>Advanced pattern recognition and predictive analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mlInsights.map((insight, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{insight.category}</h4>
                  <Badge
                    variant={
                      insight.impact === "High" ? "destructive" : insight.impact === "Medium" ? "default" : "secondary"
                    }
                  >
                    {insight.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.insight}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Confidence</span>
                  <div className="flex items-center gap-2">
                    <Progress value={insight.confidence} className="w-16" />
                    <span className="text-xs font-semibold">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
