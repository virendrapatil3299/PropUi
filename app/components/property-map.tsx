// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { MapPin, Navigation, Layers, ZoomIn, ZoomOut } from "lucide-react"

// const properties = [
//   {
//     id: 1,
//     title: "Luxury Downtown Condo",
//     location: "Manhattan, NY",
//     price: 850000,
//     roi: 18.7,
//     coordinates: { lat: 40.7589, lng: -73.9851 },
//     image: "/modern-downtown-luxury-condo-exterior.png",
//   },
//   {
//     id: 2,
//     title: "Suburban Family Home",
//     location: "Austin, TX",
//     price: 425000,
//     roi: 22.3,
//     coordinates: { lat: 30.2672, lng: -97.7431 },
//     image: "/suburban-family-house-with-garden.png",
//   },
//   {
//     id: 3,
//     title: "Commercial Office Space",
//     location: "Seattle, WA",
//     price: 1200000,
//     roi: 15.2,
//     coordinates: { lat: 47.6062, lng: -122.3321 },
//     image: "/modern-office-building-investment-property.png",
//   },
//   {
//     id: 4,
//     title: "Modern Townhouse",
//     location: "Denver, CO",
//     price: 675000,
//     roi: 19.8,
//     coordinates: { lat: 39.7392, lng: -104.9903 },
//     image: "/hero-property.png",
//   },
//   {
//     id: 5,
//     title: "Beachfront Villa",
//     location: "Miami, FL",
//     price: 1850000,
//     roi: 16.4,
//     coordinates: { lat: 25.7617, lng: -80.1918 },
//     image: "/condo-exterior.png",
//   },
//   {
//     id: 6,
//     title: "Urban Loft",
//     location: "Chicago, IL",
//     price: 520000,
//     roi: 20.1,
//     coordinates: { lat: 41.8781, lng: -87.6298 },
//     image: "/suburban-home.png",
//   },
// ]

// export function PropertyMap() {
//   const [selectedProperty, setSelectedProperty] = useState<any>(null)
//   const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 }) // Center of US
//   const [zoom, setZoom] = useState(4)
//   const [mapStyle, setMapStyle] = useState("standard")

//   // Simulate map interaction
//   const handlePropertyClick = (property: any) => {
//     setSelectedProperty(property)
//     setMapCenter(property.coordinates)
//     setZoom(12)
//   }

//   const handleZoomIn = () => {
//     setZoom(Math.min(zoom + 1, 18))
//   }

//   const handleZoomOut = () => {
//     setZoom(Math.max(zoom - 1, 1))
//   }

//   const resetView = () => {
//     setMapCenter({ lat: 39.8283, lng: -98.5795 })
//     setZoom(4)
//     setSelectedProperty(null)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Map Area */}
//         <div className="lg:col-span-2">
//           <Card className="h-[600px]">
//             <CardHeader className="pb-4">
//               <div className="flex justify-between items-center">
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="h-5 w-5" />
//                   Property Locations
//                 </CardTitle>
//                 <div className="flex items-center space-x-2">
//                   <Button variant="outline" size="sm" onClick={handleZoomIn}>
//                     <ZoomIn className="h-4 w-4" />
//                   </Button>
//                   <Button variant="outline" size="sm" onClick={handleZoomOut}>
//                     <ZoomOut className="h-4 w-4" />
//                   </Button>
//                   <Button variant="outline" size="sm" onClick={resetView}>
//                     <Navigation className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0">
//               {/* Simulated Map Interface */}
//               <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-b-lg overflow-hidden">
//                 {/* Map Background */}
//                 <div className="absolute inset-0 opacity-20">
//                   <div className="w-full h-full bg-gradient-to-br from-blue-200 via-green-100 to-blue-100"></div>
//                 </div>

//                 {/* Property Markers */}
//                 <div className="absolute inset-0 p-4">
//                   {properties.map((property, index) => (
//                     <div
//                       key={property.id}
//                       className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
//                         selectedProperty?.id === property.id ? "scale-125 z-20" : "hover:scale-110 z-10"
//                       }`}
//                       style={{
//                         left: `${20 + (index % 3) * 30}%`,
//                         top: `${20 + Math.floor(index / 3) * 25}%`,
//                       }}
//                       onClick={() => handlePropertyClick(property)}
//                     >
//                       <div
//                         className={`relative ${
//                           selectedProperty?.id === property.id
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-white text-foreground hover:bg-primary hover:text-primary-foreground"
//                         } rounded-full p-3 shadow-lg border-2 border-white transition-colors`}
//                       >
//                         <MapPin className="h-5 w-5" />
//                         <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 font-semibold">
//                           {property.roi}%
//                         </div>
//                       </div>

//                       {/* Property Info Popup */}
//                       {selectedProperty?.id === property.id && (
//                         <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border p-3 min-w-[200px] z-30">
//                           <div className="text-sm font-semibold">{property.title}</div>
//                           <div className="text-xs text-muted-foreground">{property.location}</div>
//                           <div className="text-sm font-bold text-primary mt-1">${property.price.toLocaleString()}</div>
//                           <Badge className="mt-2 text-xs">{property.roi}% ROI</Badge>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Map Controls */}
//                 <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2">
//                   <div className="text-xs text-muted-foreground">Zoom: {zoom}</div>
//                   <div className="text-xs text-muted-foreground">
//                     Center: {mapCenter.lat.toFixed(2)}, {mapCenter.lng.toFixed(2)}
//                   </div>
//                 </div>

//                 {/* Legend */}
//                 <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
//                   <div className="text-sm font-semibold mb-2">ROI Legend</div>
//                   <div className="space-y-1 text-xs">
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                       <span>20%+ ROI</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//                       <span>15-20% ROI</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//                       <span>Below 15% ROI</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Property List Sidebar */}
//         <div className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Layers className="h-5 w-5" />
//                 Properties ({properties.length})
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
//               {properties.map((property) => (
//                 <div
//                   key={property.id}
//                   className={`p-3 rounded-lg border cursor-pointer transition-all ${
//                     selectedProperty?.id === property.id
//                       ? "border-primary bg-primary/5"
//                       : "border-border hover:border-primary/50 hover:bg-muted/50"
//                   }`}
//                   onClick={() => handlePropertyClick(property)}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <img
//                       src={property.image || "/placeholder.svg"}
//                       alt={property.title}
//                       className="w-16 h-16 object-cover rounded-lg"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-semibold text-sm truncate">{property.title}</h4>
//                       <p className="text-xs text-muted-foreground flex items-center">
//                         <MapPin className="h-3 w-3 mr-1" />
//                         {property.location}
//                       </p>
//                       <div className="flex justify-between items-center mt-2">
//                         <span className="font-bold text-primary text-sm">${(property.price / 1000).toFixed(0)}K</span>
//                         <Badge variant="secondary" className="text-xs">
//                           {property.roi}% ROI
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {selectedProperty && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Selected Property</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <img
//                   src={selectedProperty.image || "/placeholder.svg"}
//                   alt={selectedProperty.title}
//                   className="w-full h-32 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="font-semibold text-lg mb-2">{selectedProperty.title}</h3>
//                 <p className="text-muted-foreground mb-4 flex items-center">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   {selectedProperty.location}
//                 </p>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Price:</span>
//                     <span className="font-bold text-primary">${selectedProperty.price.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>ROI:</span>
//                     <Badge className="bg-accent text-accent-foreground">{selectedProperty.roi}%</Badge>
//                   </div>
//                 </div>
//                 <Button className="w-full mt-4">View Full Details</Button>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
