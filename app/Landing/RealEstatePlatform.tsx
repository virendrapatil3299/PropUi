"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PropertyVisualization3D } from "../components/property-visualization-3d"
import { ValuationChart } from "../components/valuation-chart"
import { MarketInsights } from "../components/market-insights"

import { MLRecommendations } from "../components/ml-recommendations"
import { MarketAnalysis } from "../components/market-analysis"
import { ZoningOptimizer }  from "../components/zoning-optimizer"
import { FinancialPlanning } from "../components/financial/FinancialPlanning"
import  ConstructionCostEstimator  from "../components/construction/ConstructionCostEstimator"
import { ProjectManagement } from "../components/project-management"
import { AdvancedFeaturesSuite } from "../components/AdvancedFeaturesSuite"
import { PropertyBrowser } from "../components/PropertyBrowser/PropertyBrowser"
import AgentsPage from "../components/Agent/page"
import Boat from '../boat'
import {
  Building2,
  TrendingUp,
  DollarSign,
  BarChart3,
  Brain,
  MapPin,
  Target,
  ArrowRight,
  ChevronDown,
  Play,
  List,
  Map,
  Sparkles,
  Shield,
  Zap,
  Settings,
  Calculator,
  Hammer,
  Users,
} from "lucide-react"

export default function RealEstatePlatform() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing")
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [realTimeData, setRealTimeData] = useState({
    portfolioValue: "$2.4M",
    propertiesAnalyzed: 847,
    roiPrediction: "18.7%",
    marketScore: 8.4,
    lastUpdated: new Date(),
  })

  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        propertiesAnalyzed: prev.propertiesAnalyzed + Math.floor(Math.random() * 5),
        marketScore: Math.round((8.0 + Math.random() * 1.0) * 10) / 10,
        lastUpdated: new Date(),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handlePropertySelect = (propertyName: string) => {
    setSelectedProperty(propertyName)
    console.log("[v0] Selected property:", propertyName)
  }

  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-background p-6">
        <header className="border-b border-border glass-card sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">PropAI</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Real Estate Intelligence</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                
                <Button variant="outline" onClick={() => setCurrentView("landing")} className="hover-lift">
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
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
            ].map((metric, index) => (
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

          <Tabs defaultValue="valuation" className="space-y-6">
            <div className="w-full overflow-x-auto">
              <TabsList className="inline-flex h-12 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground min-w-max">
                {[
                  { value: "listings", icon: List, label: "Listings" },
                  { value: "valuation", icon: DollarSign, label: "Valuation" },
                  { value: "market", icon: BarChart3, label: "Market Analysis" },
                  { value: "zoning", icon: Settings, label: "Zoning" },
                  { value: "financial", icon: Calculator, label: "Financial" },
                  { value: "construction", icon: Hammer, label: "Construction" },
                  { value: "projects", icon: Users, label: "Projects" },
                  { value: "visualization", icon: Building2, label: "3D View" },
                  { value: "insights", icon: BarChart3, label: "Insights" },
                  { value: "advanced", icon: Sparkles, label: "Advanced" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-accent hover:text-accent-foreground gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <Boat/>
            </div>

            <TabsContent value="valuation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ValuationChart />
                </div>
                <div className="space-y-4">
                  <Card className="glass-card hover-lift">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-accent" />
                        Featured Property
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src="/modern-luxury-house.png"
                          alt="Featured Property"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Luxury Downtown Condo</h3>
                        <p className="text-muted-foreground">123 Main St, Downtown</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-2xl font-bold text-primary">$850,000</span>
                          <Badge className="bg-accent/10 text-accent border-accent/20">High ROI</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Bedrooms</p>
                          <p className="font-semibold">3</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Bathrooms</p>
                          <p className="font-semibold">2.5</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sq Ft</p>
                          <p className="font-semibold">2,100</p>
                        </div>
                      </div>
                      <Button
                        className="w-full hover-lift bg-gradient-to-r from-primary to-accent shadow-xl"
                        onClick={() => handlePropertySelect("Luxury Downtown Condo")}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="listings">
              <PropertyBrowser />
            </TabsContent>

            <TabsContent value="market">
              <MarketAnalysis />
            </TabsContent>

            <TabsContent value="zoning">
              <ZoningOptimizer />
            </TabsContent>

            <TabsContent value="financial">
              <FinancialPlanning />
            </TabsContent>

            <TabsContent value="construction">
              <ConstructionCostEstimator />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectManagement />
            </TabsContent>

            <TabsContent value="visualization">
              <PropertyVisualization3D />
            </TabsContent>

            <TabsContent value="insights">
              <MarketInsights />
            </TabsContent>

            <TabsContent value="recommendations">
              <MLRecommendations />
            </TabsContent>

            <TabsContent value="advanced">
              <AdvancedFeaturesSuite />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">PropAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Properties", "Insights", "Listings", "Map"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-accent transition-all duration-300 hover:scale-105 font-medium"
                >
                  {item}
                </a>
              ))}
              <Button
                onClick={() => setCurrentView("dashboard")}
                className="hover-lift bg-gradient-to-r from-primary to-accent"
              >
                Launch Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
