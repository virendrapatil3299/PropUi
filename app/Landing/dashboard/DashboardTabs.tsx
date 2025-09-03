"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  List, DollarSign, BarChart3, Settings, Calculator, Hammer, Users, Building2, Sparkles, MapPin,
} from "lucide-react"
import Boat from "../../boat"
import { ValuationChart } from "../../components/valuation-chart"
import { PropertyBrowser } from "../../components/PropertyBrowser/PropertyBrowser"
import { MarketAnalysis } from "../../components/market-analysis"
import { ZoningOptimizer } from "../../components/zoning-optimizer"
import { FinancialPlanning } from "../../components/financial/FinancialPlanning"
import ConstructionCostEstimator from "../../components/construction/ConstructionCostEstimator"
import { ProjectManagement } from "../../components/project-management"
import { PropertyVisualization3D } from "../../components/property-visualization-3d"
import { MarketInsights } from "../../components/market-insights"
import { MLRecommendations } from "../../components/ml-recommendations"
import { AdvancedFeaturesSuite } from "../../components/AdvancedFeaturesSuite"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DashboardTabs({ onSelectProperty }: { onSelectProperty: (p: string) => void }) {
  return (
    <Tabs defaultValue="valuation" className="space-y-6">
      <div className="w-full overflow-x-auto">
        <TabsList className="inline-flex h-12 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground min-w-max">
          {[
            { value: "valuation", icon: DollarSign, label: "Valuation" },
            { value: "listings", icon: List, label: "Listings" },
            { value: "market", icon: BarChart3, label: "Market Analysis" },
            { value: "zoning", icon: Settings, label: "Zoning" },
            { value: "financial", icon: Calculator, label: "Financial" },
            { value: "construction", icon: Hammer, label: "Construction" },
            { value: "projects", icon: Users, label: "Projects" },
            { value: "visualization", icon: Building2, label: "3D View" },
            { value: "insights", icon: BarChart3, label: "Insights" },
            { value: "advanced", icon: Sparkles, label: "Advanced" },
          ].map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="inline-flex items-center gap-2 px-3 py-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <Boat />
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
                    src="/house.jpg"
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
                  onClick={() => onSelectProperty("list")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="listings"><PropertyBrowser /></TabsContent>
      <TabsContent value="market"><MarketAnalysis /></TabsContent>
      <TabsContent value="zoning"><ZoningOptimizer /></TabsContent>
      <TabsContent value="financial"><FinancialPlanning /></TabsContent>
      <TabsContent value="construction"><ConstructionCostEstimator /></TabsContent>
      <TabsContent value="projects"><ProjectManagement /></TabsContent>
      <TabsContent value="visualization"><PropertyVisualization3D /></TabsContent>
      <TabsContent value="insights"><MarketInsights /></TabsContent>
      <TabsContent value="recommendations"><MLRecommendations /></TabsContent>
      <TabsContent value="advanced"><AdvancedFeaturesSuite /></TabsContent>
    </Tabs>
  )
}
