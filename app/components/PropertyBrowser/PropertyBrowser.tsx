"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, List, Map, Heart, Share } from "lucide-react";
import { Property } from "../PropertyBrowser/propertyData";
import { PropertyFilters } from "./PropertyFilters";
import { PropertyList } from "./PropertyList";
import { PropertyMap } from "./PropertyMap";

/* ------------------ helpers: normalization ------------------ */
const norm = (v: unknown) => String(v ?? "").trim().toLowerCase().replace(/[_-]/g, " ");

function canonStatus(raw: unknown): "for sale" | "sold" | "for rent" | "unknown" {
  const s = norm(raw);
  if (/(for sale|active|listed|available)/.test(s)) return "for sale";
  if (/(for rent|rent|lease)/.test(s)) return "for rent";
  if (/(sold|closed|off market|unavailable)/.test(s)) return "sold";
  return "unknown";
}

function canonHomeType(raw: unknown): "house" | "condo" | "townhouse" | "villa" | "loft" | "commercial" | "unknown" | "all" {
  const s = norm(raw);
  if (/house|single family|sfh/.test(s)) return "house";
  if (/condo|apartment|flat/.test(s)) return "condo";
  if (/townhouse|row house|rowhouse|town home/.test(s)) return "townhouse";
  if (/villa/.test(s)) return "villa";
  if (/loft/.test(s)) return "loft";
  if (/commercial|office|retail|industrial/.test(s)) return "commercial";
  if (/all/.test(s)) return "all";
  return "unknown";
}
/* ------------------------------------------------------------ */

export function PropertyBrowser() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusType, setStatusType] = useState("all"); // "all" | "for sale" | "sold" | "for rent"
  const [homeType, setHomeType] = useState("all"); // "all" | canonical home types
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState("price-low");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 39.8283,
    lng: -98.5795,
  });
  const [zoom, setZoom] = useState(4);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // loading + error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties directly from API and canonicalize status/homeType
  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const res = await fetch("/api/listings");
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data: any[] = await res.json();

        const normalized: Property[] = data.map((p, idx) => ({
          zpid: p.id ?? idx,
          id: p.id ?? idx,
          imgSrc: p.imgSrc ?? "/placeholder.jpg",
          image: p.imgSrc ?? "/placeholder.jpg",
          title: p.title ?? p.builderName ?? "Untitled",
          address: p.address ?? p.addressStreet ?? "Unknown Address",
          url: p.url ?? "#",
          statusText: p.statusText ?? "",
          // canonicalize status & homeType so comparisons are reliable
          statusType: canonStatus(p.statusType ?? p.statusText),
          location:
            p.addressZipcode ??
            p.addressCity ??
            p.addressState ??
            p.address ??
            "Unknown",
          homeType: canonHomeType(p.homeType ?? p.flexFieldText ?? ""),
          price: Number(p.price) || 0,
          roi: Number(p.grade) || 0,
          beds: p.beds ?? 0,
          baths: p.baths ?? 0,
          area: p.area ?? 0,
          flexFieldText: p.flexFieldText || "",
          latLong: p.latLong
            ? { latitude: p.latLong.latitude, longitude: p.latLong.longitude }
            : {
                latitude: p.lat ?? 39.8283,
                longitude: p.lng ?? -98.5795,
              },
        }));

        setAllProperties(normalized);
        setFilteredProperties(normalized);
        console.log("Fetched properties (normalized):", normalized);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Re-run filtering whenever filters change
  useEffect(() => {
    if (allProperties.length > 0) {
      filterProperties(searchTerm, statusType, homeType, priceRange, sortBy, allProperties);
    }
  }, [allProperties, searchTerm, statusType, homeType, priceRange, sortBy]);

  const filterProperties = (
    search: string,
    status: string,
    type: string,
    price: number[],
    sort: string,
    sourceProperties: Property[]
  ) => {
    const q = String(search ?? "").trim().toLowerCase();

    const filtered = sourceProperties.filter((property) => {
      const title = String(property.title ?? "").toLowerCase();
      const location = String(property.location ?? "").toLowerCase();

      const matchesSearch = q === "" ? true : title.includes(q) || location.includes(q);

      // both property.statusType and property.homeType were canonicalized during fetch
      const matchesStatus = status === "all" || property.statusType === status;
      const matchesType = type === "all" || property.homeType === type;

      const matchesPrice = property.price >= price[0] && property.price <= price[1];

      return matchesSearch && matchesStatus && matchesType && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "roi-high":
          return b.price - a.price;
        case "roi-low":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  };

  const handlePropertyClick = (property: Property | null) => {
    setSelectedProperty(property);

    if (property?.latLong) {
      setMapCenter({
        lat: property.latLong.latitude,
        lng: property.latLong.longitude,
      });
    }
  };

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const resetMapView = () => {
    setMapCenter({ lat: 39.8283, lng: -98.5795 });
    setZoom(4);
    setSelectedProperty(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusType("all");
    setHomeType("all");
    setPriceRange([0, 2000000]);
    setFilteredProperties(allProperties);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
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
        <CardContent>
          <PropertyFilters
            searchTerm={searchTerm}
            statusType={statusType}
            homeType={homeType}
            priceRange={priceRange}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onStatusType={setStatusType}
            onTypeChange={setHomeType}
            onPriceChange={setPriceRange}
            onSortChange={setSortBy}
          />
        </CardContent>
      </Card>

      {error && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-yellow-800 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredProperties.length} of {allProperties.length} properties
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hover-lift bg-transparent ">
            <Heart className="h-4 w-4 mr-1" />
            Favorites ({favorites.length})
          </Button>
          <Button variant="outline" size="sm" className="hover-lift bg-transparent">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      <Tabs
        value={viewMode}
        onValueChange={(value) => setViewMode(value as "list" | "map")}
      >
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
          <PropertyList
            properties={filteredProperties}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onPropertyClick={handlePropertyClick}
            onViewOnMap={() => setViewMode("map")}
            onClearFilters={clearFilters}
          />
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <PropertyMap
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            favorites={favorites}
            zoom={zoom}
            onPropertyClick={handlePropertyClick}
            onToggleFavorite={toggleFavorite}
            onZoomIn={() => setZoom(Math.min(zoom + 1, 18))}
            onZoomOut={() => setZoom(Math.max(zoom - 1, 1))}
            onResetView={resetMapView}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
