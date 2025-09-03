"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, AlertTriangle, CheckCircle } from "lucide-react"

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

export function InvestmentStrategies() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategies">Investment Strategies</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
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
                          <li key={i} className="text-muted-foreground">
                            • {pro}
                          </li>
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
                          <li key={i} className="text-muted-foreground">
                            • {con}
                          </li>
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
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Portfolio Optimization
                </CardTitle>
                <CardDescription>AI-recommended portfolio allocation for maximum returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Buy & Hold (60%)</span>
                    <span className="text-sm font-semibold">$1.44M</span>
                  </div>
                  <Progress value={60} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fix & Flip (25%)</span>
                    <span className="text-sm font-semibold">$600K</span>
                  </div>
                  <Progress value={25} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">BRRRR (15%)</span>
                    <span className="text-sm font-semibold">$360K</span>
                  </div>
                  <Progress value={15} />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Portfolio Value</span>
                    <span className="text-xl font-bold text-primary">$2.4M</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Projected Annual Return</span>
                    <span className="text-sm font-semibold text-accent">$384K (16%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">16.2%</div>
                    <div className="text-sm text-muted-foreground">Avg ROI</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">2.8</div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">89%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">4.2</div>
                    <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
