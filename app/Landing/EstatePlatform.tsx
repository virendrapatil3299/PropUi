"use client"

import { useState, useEffect } from "react"
import Header from "../Landing/Header"
import Hero from "../Landing/Hero"
import Footer from "../Landing/Footer"
// import other sections like Features, PropertiesShowcase, Dashboard, etc.
import Dashboard from "./dashboard/page"
import StartSection from "./StatsSection"
import Features from "./Features"
import PropertiesShowcase from "./PropertiesShowcase"
import CTASection from "./CTASection"

export default function RealEstatePlatform() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (currentView === "dashboard") {
    // render Dashboard component instead of inline code
    return <Dashboard  />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLaunchDashboard={() => setCurrentView("dashboard")} />
      <Hero onLaunchDashboard={() => setCurrentView("dashboard")} isLoaded={isLoaded} />
      {/* Features, PropertiesShowcase, StatsSection, CTASection */}
      <Features />
      <PropertiesShowcase onPropertySelect={() => {}} />
        <StartSection />
      <CTASection onLaunchDashboard={() => setCurrentView("dashboard")} />
      <Footer />
    </div>
  )
}
