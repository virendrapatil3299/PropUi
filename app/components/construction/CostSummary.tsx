"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function CostSummary() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-accent" />
          Cost Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Materials</p>
            <p className="text-xl font-bold text-primary">$247K</p>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-600">Labor</p>
            <p className="text-xl font-bold text-blue-700">$98K</p>
          </div>
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">Per Sq Ft</p>
            <p className="text-xl font-bold text-green-700">$138</p>
          </div>
          <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-600">Total</p>
            <p className="text-xl font-bold text-purple-700">$345K</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Materials (72%)</span>
            <span className="font-semibold">$247,000</span>
          </div>
          <Progress value={72} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>Labor (28%)</span>
            <span className="font-semibold">$98,000</span>
          </div>
          <Progress value={28} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
