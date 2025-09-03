"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react"

export function MarketAnalysis() {
  const [selectedRegion, setSelectedRegion] = useState("manhattan")
  const [timeframe, setTimeframe] = useState("12m")

  const marketTrends = [
    { area: "Manhattan", change: "+12.5%", trend: "up", price: "$1.2M", supply: "Low", demand: "High" },
    { area: "Brooklyn", change: "+8.3%", trend: "up", price: "$850K", supply: "Medium", demand: "High" },
    { area: "Queens", change: "+15.2%", trend: "up", price: "$650K", supply: "High", demand: "Medium" },
    { area: "Bronx", change: "+18.7%", trend: "up", price: "$480K", supply: "High", demand: "High" },
  ]

  const zoningChanges = [
    {
      area: "Downtown Brooklyn",
      type: "Residential to Mixed-Use",
      impact: "Positive",
      date: "2024-03-15",
      roi: "+25%",
    },
    {
      area: "Long Island City",
      type: "Industrial to Residential",
      impact: "High Positive",
      date: "2024-02-28",
      roi: "+40%",
    },
    { area: "Williamsburg", type: "Height Restriction Lifted", impact: "Positive", date: "2024-01-20", roi: "+15%" },
  ]

  const costAnalysis = [
    { category: "Construction", current: "$450/sqft", trend: "+5.2%", forecast: "$475/sqft" },
    { category: "Materials", current: "$125/sqft", trend: "+8.1%", forecast: "$135/sqft" },
    { category: "Labor", current: "$85/hour", trend: "+12.3%", forecast: "$95/hour" },
    { category: "Permits", current: "$15K", trend: "+3.5%", forecast: "$15.5K" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Market Analysis & Cost Tracking</h2>
          <p className="text-muted-foreground">Real-time market insights and cost projections</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manhattan">Manhattan</SelectItem>
              <SelectItem value="brooklyn">Brooklyn</SelectItem>
              <SelectItem value="queens">Queens</SelectItem>
              <SelectItem value="bronx">Bronx</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="12m">12 Months</SelectItem>
              <SelectItem value="24m">24 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="supply-demand">Supply & Demand</TabsTrigger>
          <TabsTrigger value="zoning">Zoning Changes</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTrends.map((area, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    {area.area}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{area.price}</span>
                    <Badge
                      className={`${area.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {area.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {area.change}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Supply</p>
                      <p className="font-semibold">{area.supply}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Demand</p>
                      <p className="font-semibold">{area.demand}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Price Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive price trend chart would be rendered here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supply-demand" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  Supply Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>New Listings</span>
                    <span className="font-semibold">1,247 units</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span>Inventory Level</span>
                    <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Days on Market</span>
                    <span className="font-semibold">28 days</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Demand Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Buyer Interest</span>
                    <Badge className="bg-green-100 text-green-800">High</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span>Price Competition</span>
                    <span className="font-semibold">+12% above asking</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Mortgage Applications</span>
                    <span className="font-semibold">+18.5%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zoning" className="space-y-6">
          <div className="space-y-4">
            {zoningChanges.map((change, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold text-lg">{change.area}</h3>
                        <Badge
                          className={`${
                            change.impact === "High Positive"
                              ? "bg-green-100 text-green-800"
                              : change.impact === "Positive"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {change.impact}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{change.type}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {change.date}
                        </span>
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <TrendingUp className="h-4 w-4" />
                          {change.roi} ROI Impact
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Current Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {costAnalysis.map((cost, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{cost.category}</p>
                      <p className="text-sm text-muted-foreground">Current: {cost.current}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${cost.trend.startsWith("+") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                      >
                        {cost.trend}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">Forecast: {cost.forecast}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Cost Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800">Material Cost Spike</p>
                    <p className="text-sm text-orange-600">Steel prices increased 8.1% this month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Permit Processing Improved</p>
                    <p className="text-sm text-green-600">Average approval time reduced to 21 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Seasonal Labor Adjustment</p>
                    <p className="text-sm text-blue-600">Winter rates typically 15% higher</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
