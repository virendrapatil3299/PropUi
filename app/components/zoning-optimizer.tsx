"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Building,
  Home,
  Store,
  Factory,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calculator,
  Zap,
  Target,
  FileText,
  Clock,
} from "lucide-react"

export function ZoningOptimizer() {
  const [selectedProperty, setSelectedProperty] = useState("")
  const [currentZoning, setCurrentZoning] = useState("residential")
  const [propertySize, setPropertySize] = useState("5000")

  const zoningTypes = [
    {
      id: "residential",
      name: "Residential",
      icon: Home,
      description: "Single/Multi-family homes",
      maxROI: "15%",
      developmentCost: "$200/sqft",
      timeToApproval: "3-6 months",
    },
    {
      id: "commercial",
      name: "Commercial",
      icon: Store,
      description: "Retail, office spaces",
      maxROI: "22%",
      developmentCost: "$350/sqft",
      timeToApproval: "6-12 months",
    },
    {
      id: "mixed-use",
      name: "Mixed-Use",
      icon: Building,
      description: "Residential + Commercial",
      maxROI: "28%",
      developmentCost: "$280/sqft",
      timeToApproval: "8-15 months",
    },
    {
      id: "industrial",
      name: "Industrial",
      icon: Factory,
      description: "Manufacturing, warehouses",
      maxROI: "18%",
      developmentCost: "$150/sqft",
      timeToApproval: "4-8 months",
    },
  ]

  const optimizationResults = [
    {
      zoning: "Mixed-Use",
      currentROI: "12%",
      optimizedROI: "28%",
      improvement: "+16%",
      investment: "$1.2M",
      timeline: "12 months",
      feasibility: "High",
      permits: ["Zoning Variance", "Building Permit", "Environmental Review"],
      risks: ["Market demand", "Construction costs"],
      benefits: ["Higher rental income", "Property value increase", "Tax incentives"],
    },
    {
      zoning: "Commercial",
      currentROI: "12%",
      optimizedROI: "22%",
      improvement: "+10%",
      investment: "$950K",
      timeline: "8 months",
      feasibility: "Medium",
      permits: ["Commercial Use Permit", "Parking Variance"],
      risks: ["Zoning approval", "Parking requirements"],
      benefits: ["Stable commercial income", "Long-term leases"],
    },
    {
      zoning: "High-Density Residential",
      currentROI: "12%",
      optimizedROI: "19%",
      improvement: "+7%",
      investment: "$800K",
      timeline: "6 months",
      feasibility: "High",
      permits: ["Density Bonus", "Building Permit"],
      risks: ["Community opposition", "Infrastructure capacity"],
      benefits: ["Multiple income streams", "Housing demand"],
    },
  ]

  const complianceChecks = [
    { item: "Setback Requirements", status: "compliant", details: "15ft front, 10ft sides" },
    { item: "Height Restrictions", status: "warning", details: "Current: 35ft, Max: 40ft" },
    { item: "Parking Requirements", status: "non-compliant", details: "Need 2 additional spaces" },
    { item: "Green Space Ratio", status: "compliant", details: "25% (required: 20%)" },
    { item: "FAR (Floor Area Ratio)", status: "compliant", details: "0.8 (max: 1.2)" },
    { item: "Environmental Impact", status: "pending", details: "Assessment in progress" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Zoning Optimizer</h2>
          <p className="text-muted-foreground">Maximize property potential through optimal zoning strategies</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown-condo">Downtown Condo</SelectItem>
              <SelectItem value="suburban-lot">Suburban Lot</SelectItem>
              <SelectItem value="commercial-space">Commercial Space</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Zap className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Zoning Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {zoningTypes.map((zone, index) => (
              <Card
                key={index}
                className={`glass-card hover-lift cursor-pointer transition-all ${
                  currentZoning === zone.id ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setCurrentZoning(zone.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <zone.icon className="h-5 w-5 text-accent" />
                    {zone.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">{zone.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Max ROI</span>
                      <span className="font-semibold text-green-600">{zone.maxROI}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Dev Cost</span>
                      <span className="font-semibold">{zone.developmentCost}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Timeline</span>
                      <span className="font-semibold">{zone.timeToApproval}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Current Property Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property-size">Property Size (sqft)</Label>
                    <Input
                      id="property-size"
                      value={propertySize}
                      onChange={(e) => setPropertySize(e.target.value)}
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <Label>Current Zoning</Label>
                    <Select value={currentZoning} onValueChange={setCurrentZoning}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {zoningTypes.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Current Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <span className="font-semibold">$850,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Income</span>
                      <span className="font-semibold">$102,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current ROI</span>
                      <span className="font-semibold text-blue-600">12%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Development Potential</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Max Buildable</span>
                      <span className="font-semibold">6,000 sqft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Utilization</span>
                      <span className="font-semibold">83%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="space-y-4">
            {optimizationResults.map((result, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5 text-accent" />
                        {result.zoning} Development
                      </h3>
                      <p className="text-sm text-muted-foreground">Optimization Strategy</p>
                    </div>
                    <Badge
                      className={`${
                        result.feasibility === "High"
                          ? "bg-green-100 text-green-800"
                          : result.feasibility === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.feasibility} Feasibility
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Current ROI</p>
                      <p className="text-lg font-bold">{result.currentROI}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600">Optimized ROI</p>
                      <p className="text-lg font-bold text-green-700">{result.optimizedROI}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-600">Investment</p>
                      <p className="text-lg font-bold text-blue-700">{result.investment}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-600">Timeline</p>
                      <p className="text-lg font-bold text-purple-700">{result.timeline}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Required Permits
                      </h4>
                      <ul className="space-y-1">
                        {result.permits.map((permit, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {permit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Key Risks
                      </h4>
                      <ul className="space-y-1">
                        {result.risks.map((risk, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <AlertCircle className="h-3 w-3 text-orange-500" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Benefits
                      </h4>
                      <ul className="space-y-1">
                        {result.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-semibold text-green-600">{result.improvement} ROI Improvement</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Detailed Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                Regulatory Compliance Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {check.status === "compliant" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {check.status === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                      {check.status === "non-compliant" && <AlertCircle className="h-5 w-5 text-red-500" />}
                      {check.status === "pending" && <Clock className="h-5 w-5 text-blue-500" />}
                      <div>
                        <p className="font-medium">{check.item}</p>
                        <p className="text-sm text-muted-foreground">{check.details}</p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        check.status === "compliant"
                          ? "bg-green-100 text-green-800"
                          : check.status === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : check.status === "non-compliant"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {check.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Development ROI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-value">Current Property Value</Label>
                    <Input id="current-value" placeholder="$850,000" />
                  </div>
                  <div>
                    <Label htmlFor="development-cost">Development Cost</Label>
                    <Input id="development-cost" placeholder="$1,200,000" />
                  </div>
                  <div>
                    <Label htmlFor="projected-value">Projected Value</Label>
                    <Input id="projected-value" placeholder="$2,800,000" />
                  </div>
                  <div>
                    <Label htmlFor="annual-income">Annual Income</Label>
                    <Input id="annual-income" placeholder="$280,000" />
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Calculate ROI</Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Projected Returns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Investment</span>
                    <span className="font-bold">$2,050,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Projected Value</span>
                    <span className="font-bold text-green-600">$2,800,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Capital Gain</span>
                    <span className="font-bold text-green-600">$750,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Income</span>
                    <span className="font-bold">$280,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total ROI</span>
                      <span className="text-2xl font-bold text-green-600">28.5%</span>
                    </div>
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
