"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

type PropertyFiltersProps = {
  searchTerm: string
  onSearch: (term: string) => void
  propertyType: string
  onTypeChange: (type: string) => void
  priceRange: number[]
  onPriceChange: (range: number[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function PropertyFilters({
  searchTerm,
  onSearch,
  propertyType,
  onTypeChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}: PropertyFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filter Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search by location or property name..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />

          <Select value={propertyType} onValueChange={onTypeChange}>
            <SelectTrigger>
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
            <SelectTrigger>
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

        <Slider value={priceRange} onValueChange={onPriceChange} max={2000000} min={0} step={50000} className="w-full" />
      </CardContent>
    </Card>
  )
}
