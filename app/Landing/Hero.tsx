"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Play, ChevronDown } from "lucide-react"

export default function Hero({ onLaunchDashboard, isLoaded }: { onLaunchDashboard: () => void, isLoaded: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/house.jpg" alt="Modern Real Estate" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className={`transition-all duration-1000 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            AI-Powered Real Estate
            <span className="block text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
              Intelligence
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty max-w-3xl mx-auto opacity-90 leading-relaxed">
            Transform your property investments with machine learning insights, 3D visualizations, and predictive analytics that maximize your returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 hover-lift shadow-2xl"
              onClick={onLaunchDashboard}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 bg-transparent hover-lift backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  )
}
