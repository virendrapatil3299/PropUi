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
import { Slider } from "@/components/ui/slider"
import {
  Hammer,
  Package,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calculator,
  DollarSign,
  Calendar,
  Truck,
  Wrench,
  HardHat,
} from "lucide-react"

export function ConstructionCostEstimator() {
  const [projectType, setProjectType] = useState("residential")
  const [squareFootage, setSquareFootage] = useState([2500])
  const [qualityLevel, setQualityLevel] = useState("standard")
  const [region, setRegion] = useState("manhattan")

  const materialCategories = [
    {
      category: "Foundation & Structure",
      icon: HardHat,
      items: [
        {
          material: "Concrete Foundation",
          quantity: "45 cubic yards",
          unitCost: "$180/yard",
          totalCost: "$8,100",
          trend: "+3.2%",
        },
        { material: "Steel Rebar", quantity: "2,800 lbs", unitCost: "$0.85/lb", totalCost: "$2,380", trend: "+8.1%" },
        {
          material: "Structural Steel",
          quantity: "12 tons",
          unitCost: "$1,200/ton",
          totalCost: "$14,400",
          trend: "+5.7%",
        },
        {
          material: "Lumber Framing",
          quantity: "18,000 board ft",
          unitCost: "$2.80/bf",
          totalCost: "$50,400",
          trend: "+12.3%",
        },
      ],
    },
    {
      category: "Exterior & Roofing",
      icon: Package,
      items: [
        {
          material: "Roofing Shingles",
          quantity: "28 squares",
          unitCost: "$320/square",
          totalCost: "$8,960",
          trend: "+4.5%",
        },
        {
          material: "Siding Materials",
          quantity: "2,200 sq ft",
          unitCost: "$8.50/sq ft",
          totalCost: "$18,700",
          trend: "+6.2%",
        },
        { material: "Windows", quantity: "18 units", unitCost: "$650/unit", totalCost: "$11,700", trend: "+2.8%" },
        {
          material: "Exterior Doors",
          quantity: "3 units",
          unitCost: "$1,200/unit",
          totalCost: "$3,600",
          trend: "+1.5%",
        },
      ],
    },
    {
      category: "Interior Finishes",
      icon: Wrench,
      items: [
        { material: "Flooring", quantity: "2,100 sq ft", unitCost: "$12/sq ft", totalCost: "$25,200", trend: "+7.3%" },
        { material: "Drywall", quantity: "4,800 sq ft", unitCost: "$2.20/sq ft", totalCost: "$10,560", trend: "+3.8%" },
        {
          material: "Kitchen Cabinets",
          quantity: "25 linear ft",
          unitCost: "$280/lf",
          totalCost: "$7,000",
          trend: "+9.1%",
        },
        {
          material: "Bathroom Fixtures",
          quantity: "3 sets",
          unitCost: "$1,800/set",
          totalCost: "$5,400",
          trend: "+4.2%",
        },
      ],
    },
    {
      category: "MEP Systems",
      icon: Truck,
      items: [
        {
          material: "Electrical Wiring",
          quantity: "2,500 linear ft",
          unitCost: "$3.20/lf",
          totalCost: "$8,000",
          trend: "+5.5%",
        },
        {
          material: "Plumbing Pipes",
          quantity: "800 linear ft",
          unitCost: "$12/lf",
          totalCost: "$9,600",
          trend: "+6.8%",
        },
        {
          material: "HVAC System",
          quantity: "1 system",
          unitCost: "$8,500/system",
          totalCost: "$8,500",
          trend: "+4.1%",
        },
        {
          material: "Insulation",
          quantity: "2,800 sq ft",
          unitCost: "$1.80/sq ft",
          totalCost: "$5,040",
          trend: "+2.3%",
        },
      ],
    },
  ]

  const laborCosts = [
    {
      trade: "General Contractor",
      hours: 320,
      rate: "$85/hr",
      total: "$27,200",
      description: "Project management and coordination",
    },
    {
      trade: "Carpenters",
      hours: 480,
      rate: "$65/hr",
      total: "$31,200",
      description: "Framing, trim, and finish work",
    },
    {
      trade: "Electricians",
      hours: 160,
      rate: "$78/hr",
      total: "$12,480",
      description: "Electrical installation and wiring",
    },
    {
      trade: "Plumbers",
      hours: 120,
      rate: "$82/hr",
      total: "$9,840",
      description: "Plumbing installation and fixtures",
    },
    {
      trade: "HVAC Technicians",
      hours: 80,
      rate: "$75/hr",
      total: "$6,000",
      description: "Heating and cooling systems",
    },
    { trade: "Roofers", hours: 64, rate: "$58/hr", total: "$3,712", description: "Roofing installation" },
    { trade: "Painters", hours: 96, rate: "$45/hr", total: "$4,320", description: "Interior and exterior painting" },
    { trade: "Flooring Installers", hours: 72, rate: "$52/hr", total: "$3,744", description: "Flooring installation" },
  ]

  const projectScenarios = [
    {
      name: "Basic Build",
      description: "Standard materials and finishes",
      costPerSqFt: "$180",
      timeline: "8-10 months",
      totalCost: "$450,000",
      savings: "Baseline",
      features: ["Standard fixtures", "Basic finishes", "Code minimum"],
    },
    {
      name: "Premium Build",
      description: "High-quality materials and finishes",
      costPerSqFt: "$280",
      timeline: "10-12 months",
      totalCost: "$700,000",
      savings: "+55%",
      features: ["Premium fixtures", "Custom finishes", "Energy efficient"],
    },
    {
      name: "Luxury Build",
      description: "Top-tier materials and custom work",
      costPerSqFt: "$420",
      timeline: "12-16 months",
      totalCost: "$1,050,000",
      savings: "+133%",
      features: ["Luxury fixtures", "Custom everything", "Smart home tech"],
    },
  ]

  const costFactors = [
    { factor: "Regional Labor Rates", impact: "+15%", description: "Manhattan premium pricing" },
    { factor: "Material Availability", impact: "+8%", description: "Supply chain constraints" },
    { factor: "Permit Complexity", impact: "+5%", description: "NYC building codes" },
    { factor: "Site Conditions", impact: "+12%", description: "Urban construction challenges" },
    { factor: "Seasonal Timing", impact: "-3%", description: "Off-peak construction period" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Construction Cost Estimator</h2>
          <p className="text-muted-foreground">AI-powered material and labor cost predictions</p>
        </div>
        <div className="flex gap-2">
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Calculator className="h-4 w-4 mr-2" />
            Estimate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hammer className="h-5 w-5 text-accent" />
                  Project Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Square Footage: {squareFootage[0].toLocaleString()} sq ft</Label>
                  <Slider
                    value={squareFootage}
                    onValueChange={setSquareFootage}
                    max={10000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quality Level</Label>
                  <Select value={qualityLevel} onValueChange={setQualityLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                      <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                      <SelectItem value="austin">Austin, TX</SelectItem>
                      <SelectItem value="seattle">Seattle, WA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

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
          </div>

          <div className="space-y-6">
            {materialCategories.map((category, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-accent" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Material</th>
                          <th className="text-right py-2">Quantity</th>
                          <th className="text-right py-2">Unit Cost</th>
                          <th className="text-right py-2">Total Cost</th>
                          <th className="text-right py-2">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="border-b">
                            <td className="py-3 font-medium">{item.material}</td>
                            <td className="text-right py-3">{item.quantity}</td>
                            <td className="text-right py-3">{item.unitCost}</td>
                            <td className="text-right py-3 font-bold text-primary">{item.totalCost}</td>
                            <td className="text-right py-3">
                              <Badge
                                className={`${item.trend.startsWith("+") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                              >
                                {item.trend}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="labor" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Labor Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {laborCosts.map((labor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-medium">{labor.trade}</p>
                          <p className="text-sm text-muted-foreground">{labor.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-primary">{labor.total}</p>
                      <p className="text-xs text-muted-foreground">
                        {labor.hours}h × {labor.rate}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Labor Cost</span>
                    <span className="text-2xl font-bold text-primary">$98,496</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Average Rate</span>
                    <span className="text-sm font-semibold">$67/hour</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Labor Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-800">High Availability</p>
                      <p className="text-sm text-green-600">Carpenters and general contractors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-yellow-800">Limited Availability</p>
                      <p className="text-sm text-yellow-600">Specialized electricians and plumbers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-800">High Demand</p>
                      <p className="text-sm text-red-600">HVAC technicians (+15% rates)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Cost Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {costFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{factor.factor}</p>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                    <Badge
                      className={`${factor.impact.startsWith("+") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                    >
                      {factor.impact}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectScenarios.map((scenario, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{scenario.totalCost}</p>
                    <p className="text-sm text-muted-foreground">{scenario.costPerSqFt} per sq ft</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Timeline</span>
                      <span className="font-semibold">{scenario.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">vs Basic</span>
                      <Badge
                        className={`${scenario.savings === "Baseline" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {scenario.savings}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Features:</p>
                    <ul className="space-y-1">
                      {scenario.features.map((feature, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Select Scenario
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Construction Timeline & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Pre-Construction",
                    duration: "4-6 weeks",
                    cost: "$15,000",
                    tasks: ["Permits", "Final plans", "Material ordering"],
                  },
                  {
                    phase: "Foundation",
                    duration: "2-3 weeks",
                    cost: "$45,000",
                    tasks: ["Excavation", "Concrete pour", "Curing"],
                  },
                  {
                    phase: "Framing",
                    duration: "4-6 weeks",
                    cost: "$85,000",
                    tasks: ["Structural framing", "Roof installation", "Rough openings"],
                  },
                  {
                    phase: "MEP Rough-in",
                    duration: "3-4 weeks",
                    cost: "$35,000",
                    tasks: ["Electrical", "Plumbing", "HVAC installation"],
                  },
                  {
                    phase: "Insulation & Drywall",
                    duration: "3-4 weeks",
                    cost: "$25,000",
                    tasks: ["Insulation", "Drywall", "Taping & finishing"],
                  },
                  {
                    phase: "Interior Finishes",
                    duration: "6-8 weeks",
                    cost: "$95,000",
                    tasks: ["Flooring", "Cabinets", "Trim work"],
                  },
                  {
                    phase: "Final Systems",
                    duration: "2-3 weeks",
                    cost: "$20,000",
                    tasks: ["Electrical fixtures", "Plumbing fixtures", "HVAC completion"],
                  },
                  {
                    phase: "Final Inspection",
                    duration: "1-2 weeks",
                    cost: "$5,000",
                    tasks: ["Inspections", "Touch-ups", "Cleanup"],
                  },
                ].map((phase, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{phase.phase}</h3>
                        <div className="text-right">
                          <p className="font-bold text-primary">{phase.cost}</p>
                          <p className="text-sm text-muted-foreground">{phase.duration}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.tasks.map((task, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                  Custom Estimate Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-size">Project Size (sq ft)</Label>
                    <Input id="project-size" placeholder="2,500" />
                  </div>
                  <div>
                    <Label htmlFor="stories">Number of Stories</Label>
                    <Input id="stories" placeholder="2" />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" placeholder="4" />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" placeholder="3" />
                  </div>
                  <div>
                    <Label htmlFor="garage">Garage Bays</Label>
                    <Input id="garage" placeholder="2" />
                  </div>
                  <div>
                    <Label htmlFor="basement">Basement</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Generate Custom Estimate</Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Estimate Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Base Construction</span>
                    <span className="font-bold">$285,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Site Preparation</span>
                    <span className="font-bold">$18,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Permits & Fees</span>
                    <span className="font-bold">$12,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Contingency (10%)</span>
                    <span className="font-bold">$31,550</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Estimate</span>
                      <span className="text-2xl font-bold text-primary">$347,050</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">Cost per sq ft</span>
                      <span className="text-sm font-semibold">$139</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Estimate Range:</strong> $312,000 - $382,000
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Based on current market conditions and regional factors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
