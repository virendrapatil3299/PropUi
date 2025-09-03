// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { MapPin, Bed, Bath, Square, TrendingUp, Heart, Filter } from "lucide-react"

// const properties = [
//   {
//     id: 1,
//     title: "Luxury Downtown Condo",
//     location: "Manhattan, NY",
//     price: 850000,
//     roi: 18.7,
//     beds: 3,
//     baths: 2.5,
//     sqft: 2100,
//     image: "/modern-downtown-luxury-condo-exterior.png",
//     type: "Condo",
//     status: "For Sale",
//     coordinates: { lat: 40.7589, lng: -73.9851 },
//   },
//   {
//     id: 2,
//     title: "Suburban Family Home",
//     location: "Austin, TX",
//     price: 425000,
//     roi: 22.3,
//     beds: 4,
//     baths: 3,
//     sqft: 2800,
//     image: "/suburban-family-house-with-garden.png",
//     type: "House",
//     status: "For Sale",
//     coordinates: { lat: 30.2672, lng: -97.7431 },
//   },
//   {
//     id: 3,
//     title: "Commercial Office Space",
//     location: "Seattle, WA",
//     price: 1200000,
//     roi: 15.2,
//     beds: 0,
//     baths: 0,
//     sqft: 5500,
//     image: "/modern-office-building-investment-property.png",
//     type: "Commercial",
//     status: "For Sale",
//     coordinates: { lat: 47.6062, lng: -122.3321 },
//   },
//   {
//     id: 4,
//     title: "Modern Townhouse",
//     location: "Denver, CO",
//     price: 675000,
//     roi: 19.8,
//     beds: 3,
//     baths: 2.5,
//     sqft: 2400,
//     image: "/hero-property.png",
//     type: "Townhouse",
//     status: "For Sale",
//     coordinates: { lat: 39.7392, lng: -104.9903 },
//   },
//   {
//     id: 5,
//     title: "Beachfront Villa",
//     location: "Miami, FL",
//     price: 1850000,
//     roi: 16.4,
//     beds: 5,
//     baths: 4,
//     sqft: 4200,
//     image: "/condo-exterior.png",
//     type: "Villa",
//     status: "For Sale",
//     coordinates: { lat: 25.7617, lng: -80.1918 },
//   },
//   {
//     id: 6,
//     title: "Urban Loft",
//     location: "Chicago, IL",
//     price: 520000,
//     roi: 20.1,
//     beds: 2,
//     baths: 2,
//     sqft: 1800,
//     image: "/suburban-home.png",
//     type: "Loft",
//     status: "For Sale",
//     coordinates: { lat: 41.8781, lng: -87.6298 },
//   },
// ]

// export function PropertyListings() {
//   const [filteredProperties, setFilteredProperties] = useState(properties)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [propertyType, setPropertyType] = useState("all")
//   const [priceRange, setPriceRange] = useState([0, 2000000])
//   const [sortBy, setSortBy] = useState("price-low")

//   const handleSearch = (term: string) => {
//     setSearchTerm(term)
//     filterProperties(term, propertyType, priceRange, sortBy)
//   }

//   const handleTypeFilter = (type: string) => {
//     setPropertyType(type)
//     filterProperties(searchTerm, type, priceRange, sortBy)
//   }

//   const handlePriceFilter = (range: number[]) => {
//     setPriceRange(range)
//     filterProperties(searchTerm, propertyType, range, sortBy)
//   }

//   const handleSort = (sort: string) => {
//     setSortBy(sort)
//     filterProperties(searchTerm, propertyType, priceRange, sort)
//   }

//   const filterProperties = (search: string, type: string, price: number[], sort: string) => {
//     const filtered = properties.filter((property) => {
//       const matchesSearch =
//         property.title.toLowerCase().includes(search.toLowerCase()) ||
//         property.location.toLowerCase().includes(search.toLowerCase())
//       const matchesType = type === "all" || property.type.toLowerCase() === type.toLowerCase()
//       const matchesPrice = property.price >= price[0] && property.price <= price[1]

//       return matchesSearch && matchesType && matchesPrice
//     })

//     // Sort properties
//     filtered.sort((a, b) => {
//       switch (sort) {
//         case "price-low":
//           return a.price - b.price
//         case "price-high":
//           return b.price - a.price
//         case "roi-high":
//           return b.roi - a.roi
//         case "roi-low":
//           return a.roi - b.roi
//         default:
//           return 0
//       }
//     })

//     setFilteredProperties(filtered)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Search and Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Filter className="h-5 w-5" />
//             Search & Filter Properties
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Input
//               placeholder="Search by location or property name..."
//               value={searchTerm}
//               onChange={(e) => handleSearch(e.target.value)}
//             />

//             <Select value={propertyType} onValueChange={handleTypeFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Property Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="condo">Condo</SelectItem>
//                 <SelectItem value="house">House</SelectItem>
//                 <SelectItem value="townhouse">Townhouse</SelectItem>
//                 <SelectItem value="villa">Villa</SelectItem>
//                 <SelectItem value="loft">Loft</SelectItem>
//                 <SelectItem value="commercial">Commercial</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={sortBy} onValueChange={handleSort}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Sort By" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="roi-high">ROI: High to Low</SelectItem>
//                 <SelectItem value="roi-low">ROI: Low to High</SelectItem>
//               </SelectContent>
//             </Select>

//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium">Price Range:</span>
//               <span className="text-sm text-muted-foreground">
//                 ${(priceRange[0] / 1000).toFixed(0)}K - ${(priceRange[1] / 1000).toFixed(0)}K
//               </span>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Slider
//               value={priceRange}
//               onValueChange={handlePriceFilter}
//               max={2000000}
//               min={0}
//               step={50000}
//               className="w-full"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results Summary */}
//       <div className="flex justify-between items-center">
//         <p className="text-muted-foreground">
//           Showing {filteredProperties.length} of {properties.length} properties
//         </p>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" size="sm">
//             <Heart className="h-4 w-4 mr-1" />
//             Favorites
//           </Button>
//         </div>
//       </div>

//       {/* Property Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProperties.map((property) => (
//           <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
//             <div className="relative overflow-hidden">
//               <img
//                 src={property.image || "/placeholder.svg"}
//                 alt={property.title}
//                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{property.roi}% ROI</Badge>
//               <Button size="sm" variant="secondary" className="absolute top-4 left-4 bg-white/90 hover:bg-white">
//                 <Heart className="h-4 w-4" />
//               </Button>
//             </div>

//             <CardContent className="p-6">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl font-semibold">{property.title}</h3>
//                 <Badge variant="outline">{property.type}</Badge>
//               </div>

//               <p className="text-muted-foreground mb-4 flex items-center">
//                 <MapPin className="h-4 w-4 mr-1" />
//                 {property.location}
//               </p>

//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</span>
//                 <div className="flex items-center text-sm text-accent">
//                   <TrendingUp className="h-4 w-4 mr-1" />
//                   {property.roi}% ROI
//                 </div>
//               </div>

//               {property.beds > 0 && (
//                 <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
//                   <div className="flex items-center">
//                     <Bed className="h-4 w-4 mr-1" />
//                     {property.beds} bed
//                   </div>
//                   <div className="flex items-center">
//                     <Bath className="h-4 w-4 mr-1" />
//                     {property.baths} bath
//                   </div>
//                   <div className="flex items-center">
//                     <Square className="h-4 w-4 mr-1" />
//                     {property.sqft.toLocaleString()} sqft
//                   </div>
//                 </div>
//               )}

//               <div className="flex space-x-2">
//                 <Button className="flex-1">View Details</Button>
//                 <Button variant="outline" size="sm">
//                   <MapPin className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredProperties.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
//           <Button
//             variant="outline"
//             className="mt-4 bg-transparent"
//             onClick={() => {
//               setSearchTerm("")
//               setPropertyType("all")
//               setPriceRange([0, 2000000])
//               setFilteredProperties(properties)
//             }}
//           >
//             Clear Filters
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }
