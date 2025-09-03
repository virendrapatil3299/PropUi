"use client"

import { useState } from "react"
import { PropertyFilters } from "./PropertyFilters"
import { PropertyCard } from "./PropertyCard"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Luxury Downtown Condo",
    location: "Manhattan, NY",
    price: 850000,
    roi: 18.7,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    image: "/modern-downtown-luxury-condo-exterior.png",
    type: "Condo",
    status: "For Sale",
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Austin, TX",
    price: 425000,
    roi: 22.3,
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "/suburban-family-house-with-garden.png",
    type: "House",
    status: "For Sale",
    coordinates: { lat: 30.2672, lng: -97.7431 },
  },
  // ...rest of your properties
]


export function PropertyListings() {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [sortBy, setSortBy] = useState("price-low")

  const filterProperties = (search: string, type: string, price: number[], sort: string) => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase())
      const matchesType = type === "all" || property.type.toLowerCase() === type.toLowerCase()
      const matchesPrice = property.price >= price[0] && property.price <= price[1]
      return matchesSearch && matchesType && matchesPrice
    })

    filtered.sort((a, b) => {
      switch (sort) {
        case "price-low": return a.price - b.price
        case "price-high": return b.price - a.price
        case "roi-high": return b.roi - a.roi
        case "roi-low": return a.roi - b.roi
        default: return 0
      }
    })

    setFilteredProperties(filtered)
  }

  const handleSearch = (term: string) => { setSearchTerm(term); filterProperties(term, propertyType, priceRange, sortBy) }
  const handleTypeFilter = (type: string) => { setPropertyType(type); filterProperties(searchTerm, type, priceRange, sortBy) }
  const handlePriceFilter = (range: number[]) => { setPriceRange(range); filterProperties(searchTerm, propertyType, range, sortBy) }
  const handleSort = (sort: string) => { setSortBy(sort); filterProperties(searchTerm, propertyType, priceRange, sort) }

  return (
    <div className="space-y-6">
      <PropertyFilters
        searchTerm={searchTerm} onSearch={handleSearch}
        propertyType={propertyType} onTypeChange={handleTypeFilter}
        priceRange={priceRange} onPriceChange={handlePriceFilter}
        sortBy={sortBy} onSortChange={handleSort}
      />

      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            Favorites
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent"
            onClick={() => {
              setSearchTerm(""); setPropertyType("all"); setPriceRange([0, 2000000]); setFilteredProperties(properties)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
