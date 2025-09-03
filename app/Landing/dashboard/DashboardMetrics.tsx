"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Building2, TrendingUp, BarChart3 } from "lucide-react"

export default function DashboardMetrics({ realTimeData }: { realTimeData: any }) {
  const metrics = [
    {
      title: "Portfolio Value",
      value: realTimeData.portfolioValue,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Properties Analyzed",
      value: realTimeData.propertiesAnalyzed.toString(),
      change: "+23",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "ROI Prediction",
      value: realTimeData.roiPrediction,
      change: "Next 12 months",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Market Score",
      value: `${realTimeData.marketScore}/10`,
      change: `${Math.round(realTimeData.marketScore * 10)}%`,
      icon: BarChart3,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="glass-card hover-lift animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">{metric.change}</span>{" "}
              {metric.title === "ROI Prediction" ? "forecast" : "from last month"}
            </p>
            {metric.title === "Market Score" && (
              <Progress value={Math.round(realTimeData.marketScore * 10)} className="mt-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
