"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Heart,
  Filter,
  List,
  Map,
  Navigation,
  ZoomIn,
  ZoomOut,
  Eye,
  Calculator,
  Share,
} from "lucide-react"

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
    description: "Modern luxury condo with stunning city views and premium amenities.",
    yearBuilt: 2020,
    parking: 2,
    features: ["Gym", "Pool", "Concierge", "Rooftop Deck"],
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
    description: "Spacious family home with large backyard and modern updates.",
    yearBuilt: 2018,
    parking: 2,
    features: ["Garden", "Garage", "Updated Kitchen", "Hardwood Floors"],
  },
  {
    id: 3,
    title: "Commercial Office Space",
    location: "Seattle, WA",
    price: 1200000,
    roi: 15.2,
    beds: 0,
    baths: 0,
    sqft: 5500,
    image: "/modern-office-building-investment-property.png",
    type: "Commercial",
    status: "For Sale",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    description: "Prime commercial space in downtown Seattle business district.",
    yearBuilt: 2019,
    parking: 10,
    features: ["Elevator", "Conference Rooms", "High-Speed Internet", "Security System"],
  },
  {
    id: 4,
    title: "Modern Townhouse",
    location: "Denver, CO",
    price: 675000,
    roi: 19.8,
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    image: "/hero-property.png",
    type: "Townhouse",
    status: "For Sale",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    description: "Contemporary townhouse with mountain views and modern finishes.",
    yearBuilt: 2021,
    parking: 2,
    features: ["Mountain Views", "Modern Kitchen", "Patio", "Energy Efficient"],
  },
  {
    id: 5,
    title: "Beachfront Villa",
    location: "Miami, FL",
    price: 1850000,
    roi: 16.4,
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: "/condo-exterior.png",
    type: "Villa",
    status: "For Sale",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    description: "Stunning beachfront villa with private beach access and luxury amenities.",
    yearBuilt: 2017,
    parking: 3,
    features: ["Beach Access", "Pool", "Wine Cellar", "Smart Home"],
  },
  {
    id: 6,
    title: "Urban Loft",
    location: "Chicago, IL",
    price: 520000,
    roi: 20.1,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "/suburban-home.png",
    type: "Loft",
    status: "For Sale",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    description: "Industrial-style loft in trendy neighborhood with exposed brick.",
    yearBuilt: 2016,
    parking: 1,
    features: ["Exposed Brick", "High Ceilings", "Industrial Design", "City Views"],
  },
]

export function PropertyBrowser() {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [sortBy, setSortBy] = useState("price-low")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 })
  const [zoom, setZoom] = useState(4)
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterProperties(term, propertyType, priceRange, sortBy)
  }

  const handleTypeFilter = (type: string) => {
    setPropertyType(type)
    filterProperties(searchTerm, type, priceRange, sortBy)
  }

  const handlePriceFilter = (range: number[]) => {
    setPriceRange(range)
    filterProperties(searchTerm, propertyType, range, sortBy)
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
    filterProperties(searchTerm, propertyType, priceRange, sort)
  }

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
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "roi-high":
          return b.roi - a.roi
        case "roi-low":
          return a.roi - b.roi
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
    setMapCenter(property.coordinates)
    setZoom(12)
  }

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const resetMapView = () => {
    setMapCenter({ lat: 39.8283, lng: -98.5795 })
    setZoom(4)
    setSelectedProperty(null)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Properties
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="hover-lift"
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="hover-lift"
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
            <Input
              placeholder="Search by location or property name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="hover:border-primary/50 transition-colors "
            />

            <Select value={propertyType} onValueChange={handleTypeFilter}>
              <SelectTrigger className="hover:border-primary/50 transition-colors ">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">  All </SelectItem>
                <SelectItem value="condo">For Sale</SelectItem>
                <SelectItem value="house">Sold</SelectItem>
                <SelectItem value="townhouse">For Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={propertyType} onValueChange={handleTypeFilter}>
              <SelectTrigger className="hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="roi-high">ROI: High to Low</SelectItem>
                <SelectItem value="roi-low">ROI: Low to High</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Price Range:</span>
              <span className="text-sm text-muted-foreground">
                ${(priceRange[0] / 1000).toFixed(0)}K - ${(priceRange[1] / 1000).toFixed(0)}K
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceFilter}
              max={2000000}
              min={0}
              step={50000}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hover-lift bg-transparent">
            <Heart className="h-4 w-4 mr-1" />
            Favorites ({favorites.length})
          </Button>
          <Button variant="outline" size="sm" className="hover-lift bg-transparent">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "map")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Map View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group glass-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg">
                    {property.roi}% ROI
                  </Badge>
                  <Button
                    size="sm"
                    variant={favorites.includes(property.id) ? "default" : "secondary"}
                    className="absolute top-4 left-4 bg-white/90 hover:bg-white shadow-lg"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-primary">{property.title}</h3>
                    <Badge variant="outline">{property.type}</Badge>
                  </div>

                  <p className="text-muted-foreground mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{property.description}</p>

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
                    <Button className="flex-1 hover-lift" onClick={() => handlePropertyClick(property)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                      <Calculator className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-lift bg-transparent"
                      onClick={() => setViewMode("map")}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] glass-card">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Property Locations
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setZoom(Math.min(zoom + 1, 18))}
                        className="hover-lift"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setZoom(Math.max(zoom - 1, 1))}
                        className="hover-lift"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetMapView} className="hover-lift bg-transparent">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-b-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-gradient-to-br from-blue-200 via-green-100 to-blue-100"></div>
                    </div>

                    <div className="absolute inset-0 p-4">
                      {filteredProperties.map((property, index) => (
                        <div
                          key={property.id}
                          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                            selectedProperty?.id === property.id ? "scale-125 z-20" : "hover:scale-110 z-10"
                          }`}
                          style={{
                            left: `${20 + (index % 3) * 30}%`,
                            top: `${20 + Math.floor(index / 3) * 25}%`,
                          }}
                          onClick={() => handlePropertyClick(property)}
                        >
                          <div
                            className={`relative ${
                              selectedProperty?.id === property.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-white text-foreground hover:bg-primary hover:text-primary-foreground"
                            } rounded-full p-3 shadow-lg border-2 border-white transition-colors`}
                          >
                            <MapPin className="h-5 w-5" />
                            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 font-semibold">
                              {property.roi}%
                            </div>
                          </div>

                          {selectedProperty?.id === property.id && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border p-3 min-w-[200px] z-30">
                              <div className="text-sm font-semibold">{property.title}</div>
                              <div className="text-xs text-muted-foreground">{property.location}</div>
                              <div className="text-sm font-bold text-primary mt-1">
                                ${property.price.toLocaleString()}
                              </div>
                              <Badge className="mt-2 text-xs">{property.roi}% ROI</Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2">
                      <div className="text-xs text-muted-foreground">Zoom: {zoom}</div>
                      <div className="text-xs text-muted-foreground">Properties: {filteredProperties.length}</div>
                    </div>

                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                      <div className="text-sm font-semibold mb-2">ROI Legend</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>20%+ ROI</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span>15-20% ROI</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span>Below 15% ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5" />
                    Properties ({filteredProperties.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover-lift ${
                        selectedProperty?.id === property.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                      onClick={() => handlePropertyClick(property)}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{property.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {property.location}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-primary text-sm">
                              ${(property.price / 1000).toFixed(0)}K
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {property.roi}% ROI
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {selectedProperty && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Property</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={selectedProperty.image || "/placeholder.svg"}
                      alt={selectedProperty.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">{selectedProperty.title}</h3>
                    <p className="text-muted-foreground mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedProperty.location}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{selectedProperty.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-bold text-primary">${selectedProperty.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI:</span>
                        <Badge className="bg-accent text-accent-foreground">{selectedProperty.roi}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Year Built:</span>
                        <span>{selectedProperty.yearBuilt}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 hover-lift">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-lift bg-transparent"
                        onClick={() => toggleFavorite(selectedProperty.id)}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(selectedProperty.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent hover-lift"
            onClick={() => {
              setSearchTerm("")
              setPropertyType("all")
              setPriceRange([0, 2000000])
              setFilteredProperties(properties)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
