"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp } from "lucide-react"

export function PortfolioTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Portfolio Optimization
          </CardTitle>
          <CardDescription>
            AI-recommended portfolio allocation for maximum returns
          </CardDescription>
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
              <span className="text-sm text-muted-foreground">
                Projected Annual Return
              </span>
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
  )
}
