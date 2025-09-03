"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

import ProjectParameters from "./ProjectParameters"
import CostSummary from "./CostSummary"
import MaterialCategoryTable from "./MaterialCategoryTable"
import LaborBreakdown from "./LaborBreakdown"
import LaborTrends from "./LaborTrends"
import CostFactors from "./CostFactors"
import ScenarioCards from "./ScenarioCards"
import Timeline from "./Timeline"
import CustomCalculator from "./CustomCalculator"
import EstimateResults from "./EstimateResults"

export default function ConstructionCostEstimator() {
  const [projectType, setProjectType] = useState("residential")
  const [squareFootage, setSquareFootage] = useState<number[]>([2500])
  const [qualityLevel, setQualityLevel] = useState("standard")
  const [region, setRegion] = useState("manhattan")

  // 🔹 Dummy Data (replace with API later)
  const costSummary = {
    total: 450000,
    materials: 270000,
    labor: 120000,
    overhead: 60000,
  }

  const materialCategories = [
    {
      category: "Structural",
      total: 120000,
      materials: [
        { name: "Concrete", cost: 50000, unit: "cubic m", change: "+3%" },
        { name: "Steel", cost: 70000, unit: "tons", change: "-2%" },
      ],
    },
    {
      category: "Finishes",
      total: 80000,
      materials: [
        { name: "Flooring", cost: 30000, unit: "sqft", change: "+5%" },
        { name: "Paint", cost: 10000, unit: "liters", change: "0%" },
        { name: "Wood", cost: 40000, unit: "sqft", change: "+1%" },
      ],
    },
  ]

  const laborCosts = [
    { role: "Carpenter", hourly: 35, demand: "High" },
    { role: "Electrician", hourly: 40, demand: "Moderate" },
    { role: "Plumber", hourly: 38, demand: "High" },
    { role: "Mason", hourly: 30, demand: "Low" },
  ]

  const costFactors = [
    { factor: "Location", impact: "Urban (↑10%)" },
    { factor: "Season", impact: "Summer (↑5%)" },
    { factor: "Material Supply", impact: "Stable" },
  ]

  const scenarios = [
    { name: "Basic", cost: "$400,000", duration: "8 months", description: "Standard materials, minimal customization." },
    { name: "Standard", cost: "$450,000", duration: "10 months", description: "Balanced quality and cost efficiency." },
    { name: "Premium", cost: "$550,000", duration: "12 months", description: "High-end materials, luxury finishes." },
  ]

  const timeline = [
    { phase: "Design & Permits", duration: "1-2 months", progress: 100 },
    { phase: "Foundation", duration: "1 month", progress: 100 },
    { phase: "Framing", duration: "2 months", progress: 80 },
    { phase: "Finishes", duration: "3 months", progress: 40 },
    { phase: "Inspection & Handover", duration: "1 month", progress: 0 },
  ]

  return (
    <div className="space-y-6">
      {/* Header + Project Type */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Construction Cost Estimator</h2>
          <p className="text-muted-foreground">AI-powered material and labor cost predictions</p>
        </div>
        <div className="flex gap-2">
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Calculator className="h-4 w-4 mr-2" /> Estimate
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        {/* Materials Tab */}
        <TabsContent value="materials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ProjectParameters
              squareFootage={squareFootage}
              setSquareFootage={setSquareFootage}
              qualityLevel={qualityLevel}
              setQualityLevel={setQualityLevel}
              region={region}
              setRegion={setRegion}
            />
            <CostSummary />
          </div>
          <MaterialCategoryTable materialCategories={materialCategories} />
        </TabsContent>

        {/* Labor Tab */}
        <TabsContent value="labor">
          <LaborBreakdown laborCosts={laborCosts} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <LaborTrends />
            <CostFactors costFactors={costFactors} />
          </div>
        </TabsContent>

        {/* Scenarios */}
        <TabsContent value="scenarios">
          <ScenarioCards scenarios={scenarios} />
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline">
          <Timeline timeline={timeline} />
        </TabsContent>

        {/* Calculator */}
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomCalculator />
            <EstimateResults
              estimate={costSummary.total}
              range={{ min: 400000, max: 500000 }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
