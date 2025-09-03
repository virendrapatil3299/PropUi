"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrategiesTab } from "./StrategiesTab"
import { PortfolioTab } from "./PortfolioTab"
import { RecommendationsTab } from "./RecommendationsTab"

export function InvestmentStrategies() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategies">Investment Strategies</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies">
          <StrategiesTab />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioTab />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
