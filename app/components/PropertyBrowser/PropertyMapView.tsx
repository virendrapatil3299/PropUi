"use client"

import { PropertyMap } from "./PropertyMap"
import { PropertySidebar } from "./PropertySidebar"

interface PropertyMapViewProps {
  properties: any[]
  toggleFavorite: (id: number) => void
  favorites: number[]
}

export function PropertyMapView({ properties, toggleFavorite, favorites }: PropertyMapViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <PropertySidebar
          properties={properties}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      </div>

      {/* Map */}
      <div className="lg:col-span-2 h-[600px]">
        {/* <PropertyMap properties={properties} /> */}
         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      </div>
    </div>
  )
}
