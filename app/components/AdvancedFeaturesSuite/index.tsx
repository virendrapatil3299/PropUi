"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calculator, Shield, TrendingUp, AlertTriangle, Brain } from "lucide-react"

import { HeatMap } from "./HeatMap"
import { TaxOptimization } from "./TaxOptimization"
import { ComplianceChecker } from "./ComplianceChecker"
import { Forecasting } from "./Forecasting"
import { RiskAnalysis } from "./RiskAnalysis"
import { DesignOptimization } from "./DesignOptimization"

export function AdvancedFeaturesSuite() {
  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-gray-800 bg-clip-text text-transparent">
            Advanced AI Features Suite
          </CardTitle>
          <CardDescription>
            Comprehensive tools for investment analysis, risk assessment, and regulatory compliance
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="heatmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="heatmap"><MapPin className="h-4 w-4"/> Heat Map</TabsTrigger>
              <TabsTrigger value="tax"><Calculator className="h-4 w-4"/> Tax</TabsTrigger>
              <TabsTrigger value="compliance"><Shield className="h-4 w-4"/> Compliance</TabsTrigger>
              <TabsTrigger value="forecasting"><TrendingUp className="h-4 w-4"/> Forecasting</TabsTrigger>
              <TabsTrigger value="risk"><AlertTriangle className="h-4 w-4"/> Risk</TabsTrigger>
              <TabsTrigger value="design"><Brain className="h-4 w-4"/> Design</TabsTrigger>
            </TabsList>

            <TabsContent value="heatmap"><HeatMap /></TabsContent>
            <TabsContent value="tax"><TaxOptimization /></TabsContent>
            <TabsContent value="compliance"><ComplianceChecker /></TabsContent>
            <TabsContent value="forecasting"><Forecasting /></TabsContent>
            <TabsContent value="risk"><RiskAnalysis /></TabsContent>
            <TabsContent value="design"><DesignOptimization /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
