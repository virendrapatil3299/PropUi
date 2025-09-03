"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


import { MapPin, Bed, Bath, Square, TrendingUp, Heart } from "lucide-react"

type PropertyCardProps = {
  property: any
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{property.roi}% ROI</Badge>
        <Button size="sm" variant="secondary" className="absolute top-4 left-4 bg-white/90 hover:bg-white">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{property.title}</h3>
          <Badge variant="outline">{property.type}</Badge>
        </div>

        <p className="text-muted-foreground mb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</span>
          <div className="flex items-center text-sm text-accent">
            <TrendingUp className="h-4 w-4 mr-1" />
            {property.roi}% ROI
          </div>
        </div>

        {property.beds > 0 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.beds} bed
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.baths} bath
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.sqft.toLocaleString()} sqft
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button className="flex-1">View Details</Button>
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
