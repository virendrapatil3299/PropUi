"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface PropertyFiltersProps {
  searchTerm: string;
  statusType: string;
  homeType: string;
  priceRange: number[];
  sortBy: string;
  onSearchChange: (term: string) => void;
  onStatusType: (status: string) => void;
  onTypeChange: (type: string) => void;
  onPriceChange: (range: number[]) => void;
  onSortChange: (sort: string) => void;
}

export function PropertyFilters({
  searchTerm,
  statusType,
  homeType,
  priceRange,
  sortBy,
  onSearchChange,
  onStatusType,
  onTypeChange,
  onPriceChange,
  onSortChange,
}: PropertyFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
        <Input
          placeholder="Search by location or property name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="hover:border-primary/50 transition-colors"
        />

        <Select value={statusType} onValueChange={onStatusType}>
          <SelectTrigger className="hover:border-primary/50 transition-colors">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="for sale">For Sale</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="for rent">For Rent</SelectItem>
          </SelectContent>
        </Select>

        <Select value={homeType} onValueChange={onTypeChange}>
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

        <Select value={sortBy} onValueChange={onSortChange}>
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
          onValueChange={onPriceChange}
          max={2000000}
          min={0}
          step={50000}
          className="w-full"
        />
      </div>
    </div>
  );
}
