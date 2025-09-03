"use client"

import Link from "next/link"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="border-b border-border glass-card sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">PropAI</h1>
              <p className="text-sm text-muted-foreground">
                AI-Powered Real Estate Intelligence
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/components/Agent">
              <Button className="hover-lift bg-gradient-to-r from-primary to-accent">
                Find an Agent
              </Button>
            </Link>
            <Button variant="outline" onClick={onBack} className="hover-lift">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
