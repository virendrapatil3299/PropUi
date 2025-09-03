"use client"

import { Button } from "@/components/ui/button"
import { Zap, ArrowRight, Shield } from "lucide-react"

export default function CTASection({ onLaunchDashboard }: { onLaunchDashboard: () => void }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">
          Ready to Transform Your Real Estate Investments?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
          Join thousands of investors who are already using AI to maximize their real estate returns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-4 hover-lift bg-gradient-to-r from-primary to-accent shadow-xl"
            onClick={onLaunchDashboard}
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-4 hover-lift border-2 bg-transparent">
            <Shield className="mr-2 h-5 w-5" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
