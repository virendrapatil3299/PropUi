"use client"

import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function Header({ onLaunchDashboard }: { onLaunchDashboard: () => void }) {
  return (
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
            <Link href="/Landing/dashboard">
                <Button className="hover-lift bg-gradient-to-r from-primary to-accent">
                  Launch Dashboard
                </Button>
              </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
