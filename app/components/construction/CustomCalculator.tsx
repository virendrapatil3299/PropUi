"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CustomCalculator() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Custom Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Square Footage" type="number" />
        <Input placeholder="Number of Rooms" type="number" />
        <Input placeholder="Bathrooms" type="number" />
        <Button className="w-full">Calculate</Button>
      </CardContent>
    </Card>
  )
}
