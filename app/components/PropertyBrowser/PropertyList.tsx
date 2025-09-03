"use client";

import { Property } from "../PropertyBrowser/propertyData";
import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";

interface PropertyListProps {
  properties: Property[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPropertyClick: (property: Property) => void;
  onViewOnMap: () => void;
  onClearFilters: () => void;
}

export function PropertyList({
  properties,
  favorites,
  onToggleFavorite,
  onPropertyClick,
  onViewOnMap,
  onClearFilters,
}: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
        <Button
          variant="outline"
          className="mt-4 bg-transparent hover-lift"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorited={favorites.includes(property.id)}
          onToggleFavorite={onToggleFavorite}
          onViewOnMap={onViewOnMap}
        />
      ))}
    </div>
  );
}