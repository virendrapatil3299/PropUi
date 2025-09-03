"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function HeatMap() {
  const [selectedRegion, setSelectedRegion] = useState("manhattan")

  const heatMapData = [
    { area: "Manhattan", roi: 18.7, demand: 94, color: "bg-red-500" },
    { area: "Brooklyn", roi: 22.3, demand: 87, color: "bg-orange-500" },
    { area: "Queens", roi: 15.2, demand: 78, color: "bg-yellow-500" },
    { area: "Bronx", roi: 28.1, demand: 65, color: "bg-green-500" },
    { area: "Staten Island", roi: 12.8, demand: 52, color: "bg-blue-500" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <MapPin className="h-5 w-5"/> Investment Heat Map - NYC Metro
            </CardTitle>
            <CardDescription>AI-powered investment opportunity mapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {heatMapData.map((area, i) => (
                <div key={i}
                  className={`${area.color} rounded-lg p-4 text-white cursor-pointer hover:scale-105`}
                  onClick={() => setSelectedRegion(area.area.toLowerCase())}
                >
                  <h3 className="font-semibold text-sm">{area.area}</h3>
                  <p className="text-xs opacity-90">ROI: {area.roi}%</p>
                  <p className="text-xs opacity-90">Demand: {area.demand}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-purple-200">
          <CardHeader><CardTitle className="text-lg text-purple-600">Land Acquisition Insights</CardTitle></CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-gray-800">
              Generate Acquisition Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
