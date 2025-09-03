"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function PropertiesShowcase({ onPropertySelect }: { onPropertySelect: (name: string) => void }) {
  const properties = [
    {
      image: "/luxury-home.jpg",
      title: "Luxury Downtown Condo",
      location: "Manhattan, NY",
      price: "$850,000",
      roi: "18.7%",
      beds: 3,
      baths: 2.5,
      sqft: "2,100",
    },
    {
      image: "/house.jpg",
      title: "Suburban Family Home",
      location: "Austin, TX",
      price: "$425,000",
      roi: "22.3%",
      beds: 4,
      baths: 3,
      sqft: "2,800",
    },
    {
      image: "/house-.jpg",
      title: "Commercial Office Space",
      location: "Seattle, WA",
      price: "$1,200,000",
      roi: "15.2%",
      beds: 0,
      baths: 0,
      sqft: "5,500",
    },
  ]

  return (
    <section id="properties" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">
            Featured Investment Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover high-potential properties identified by our AI algorithms with detailed ROI projections and
            market analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <Card key={index} className="overflow-hidden glass-card hover-lift border-0 shadow-xl group">
              <div className="relative overflow-hidden">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg">
                  {property.roi} ROI
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">{property.title}</h3>
                <p className="text-muted-foreground mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-accent" />
                  {property.location}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gradient">{property.price}</span>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {property.beds > 0 && <span>{property.beds} bed</span>}
                    {property.baths > 0 && <span>{property.baths} bath</span>}
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
                <Button
                  className="w-full hover-lift bg-gradient-to-r from-primary to-accent"
                  onClick={() => onPropertySelect(property.title)}
                >
                  View Analysis
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
