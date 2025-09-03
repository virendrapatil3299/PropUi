"use client"

import { Building2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-muted to-background py-12 border-t">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo + Branding */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">PropAI</span>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 text-muted-foreground">
            {["Privacy", "Terms", "Support"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-accent transition-colors duration-300 hover:scale-105"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 PropAI. All rights reserved. Powered by advanced AI technology.</p>
        </div>
      </div>
    </footer>
  )
}
