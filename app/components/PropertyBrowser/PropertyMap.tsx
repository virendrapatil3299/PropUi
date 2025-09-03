"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ZoomIn, ZoomOut, Navigation, Eye, Heart } from "lucide-react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Property } from "../PropertyBrowser/propertyData";

interface PropertyMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  favorites: number[];
  zoom: number;
  onPropertyClick: (property: Property | null) => void;
  onToggleFavorite: (id: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

// Default location if no properties exist (Delhi, India)
const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.209 };

export function PropertyMap({
  properties,
  selectedProperty,
  favorites,
  zoom,
  onPropertyClick,
  onToggleFavorite,
  onZoomIn,
  onZoomOut,
  onResetView,
}: PropertyMapProps) {
  const firstProperty = properties.find((p) => p.latLong) || null;
  const center = firstProperty?.latLong || DEFAULT_LOCATION;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Map */}
      <div className="lg:col-span-2">
        <Card className="h-[500px] glass-card">
          <CardHeader className="pb-4 flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Property Locations
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onZoomIn} className="hover-lift">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onZoomOut} className="hover-lift">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onResetView} className="hover-lift bg-transparent">
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 h-[420px] ml-5 rounded-xl ">
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: center.longitude,
                latitude: center.latitude,
                zoom: zoom || 10,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v12"
            >
              <NavigationControl position="bottom-right" />

              {/* Markers */}
              {properties.map((property) => {
                const location = property.latLong || DEFAULT_LOCATION;
                return (
                  <Marker
                    key={property.id}
                    longitude={location.longitude}
                    latitude={location.latitude}
                    anchor="bottom"
                    onClick={(e) => {
                      e.originalEvent.stopPropagation();
                      onPropertyClick(property);
                    }}
                  >
                    <div
                      className={`relative cursor-pointer transition-all ${
                        selectedProperty?.id === property.id ? "scale-125 z-20" : "hover:scale-110 z-10"
                      }`}
                    >
                      <div
                        className={`relative rounded-full p-1  shadow-lg border-0 border-white ${
                          selectedProperty?.id === property.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-white text-foreground hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        <MapPin className="h-5 w-5" />
                        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 font-semibold">
                          ${property.price}
                        </div>
                      </div>
                    </div>
                  </Marker>
                );
              })}

              {/* Popup */}
              {selectedProperty?.latLong && (
                <Popup
                longitude={selectedProperty.latLong.longitude}
                latitude={selectedProperty.latLong.latitude}
                anchor="top"
                closeOnClick={false}
                onClose={() => onPropertyClick(null)}
                className="z-30"
              >
                <div className="bg-white rounded-lg shadow-xl p-4 w-48 text-sm font-sans border border-gray-200">
                  {/* Property Title */}
                  <div className="font-semibold text-primary truncate">{selectedProperty.title}</div>

                  {/* Address */}
                  <div className="text-xs text-gray-500 truncate mt-1">{selectedProperty.address}</div>

                  {/* Price */}
                  <div className="text-sm font-bold text-primary mt-2">
                    ${selectedProperty.price?.toLocaleString() ?? 0}
                  </div>

                  {/* ROI Badge */}
                  <div className="mt-2">
                    <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                      {selectedProperty.roi ?? 0}% ROI
                    </Badge>
                  </div>

                  {/* Optional: Add arrow */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200 shadow-sm"></div>
                </div>
              </Popup>

              )}
            </Map>
          </CardContent>
        </Card>
      </div>

      {/* Right: Property List */}
      <div className="space-y-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Properties ({properties.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
            {properties.map((property) => (
              <div
                key={property.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover-lift ${
                  selectedProperty?.id === property.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => onPropertyClick(property)}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={property.imgSrc ?? "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{property.statusType}</h4>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.address}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-primary text-sm">${property.price ?? 0}K</span>
                      <Badge variant="secondary" className="text-xs">
                        {property.roi ?? 0}% ROI
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Property Details */}
        {selectedProperty && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Selected Property</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={selectedProperty.imgSrc ?? "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"}
                alt={selectedProperty.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{selectedProperty.statusText}</h3>
              <p className="text-muted-foreground mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {selectedProperty.address}
              </p>
              <p className="text-sm text-muted-foreground mb-4">{selectedProperty.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-bold text-primary">${selectedProperty.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI:</span>
                  <Badge className="bg-accent text-accent-foreground">{selectedProperty.roi ?? 0}%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Year Built:</span>
                  <span>{selectedProperty.flexFieldText ?? "-"}</span>
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
                  onClick={() => onToggleFavorite(selectedProperty.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(selectedProperty.id) ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
