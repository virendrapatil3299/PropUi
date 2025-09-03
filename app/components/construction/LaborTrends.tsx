"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp, Activity } from "lucide-react"

export default function LaborTrends() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Labor Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-600">Availability</p>
          <p className="text-xl font-bold text-blue-700">Moderate</p>
        </div>
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-600">Demand</p>
          <p className="text-xl font-bold text-orange-700">High</p>
        </div>
      </CardContent>
    </Card>
  )
}
