"use client"

import { useState, useEffect } from "react"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "./DashboardHeader"
import DashboardMetrics from "./DashboardMetrics"
import DashboardTabs from "./DashboardTabs"

export default function RealEstatePlatform() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing")
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [realTimeData, setRealTimeData] = useState({
    portfolioValue: "$2.4M",
    propertiesAnalyzed: 847,
    roiPrediction: "18.7%",
    marketScore: 8.4,
    lastUpdated: new Date(),
  })

  useEffect(() => {
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

  
    return (
      <div className="min-h-screen bg-background p-6">
        <DashboardHeader onBack={() => setCurrentView("landing")} />
        <main className="container mx-auto px-6 py-8">
          <DashboardMetrics realTimeData={realTimeData} />
          <DashboardTabs onSelectProperty={setSelectedProperty} />
        </main>
      </div>
    )
  }


