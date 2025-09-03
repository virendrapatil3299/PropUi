"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hammer } from "lucide-react"

type Props = {
  squareFootage: number[]
  setSquareFootage: (val: number[]) => void
  qualityLevel: string
  setQualityLevel: (val: string) => void
  region: string
  setRegion: (val: string) => void
}

export default function ProjectParameters({
  squareFootage,
  setSquareFootage,
  qualityLevel,
  setQualityLevel,
  region,
  setRegion,
}: Props) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hammer className="h-5 w-5 text-accent" />
          Project Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Square footage */}
        <div className="space-y-2">
          <Label>
            Square Footage: {squareFootage?.[0]?.toLocaleString() ?? 0} sq ft
          </Label>
          <Slider
            value={squareFootage}
            onValueChange={setSquareFootage}
            max={10000}
            min={500}
            step={100}
          />
        </div>

        {/* Quality */}
        <div className="space-y-2">
          <Label>Quality Level</Label>
          <Select value={qualityLevel} onValueChange={setQualityLevel}>
            <SelectTrigger><SelectValue placeholder="Select quality" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label>Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="manhattan">Manhattan, NY</SelectItem>
              <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
              <SelectItem value="austin">Austin, TX</SelectItem>
              <SelectItem value="seattle">Seattle, WA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
