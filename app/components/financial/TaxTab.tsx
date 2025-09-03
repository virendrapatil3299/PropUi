"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TaxTab() {
  const taxData = {
    propertyValue: 500000,
    taxRate: 1.2, // %
    depreciation: 15000,
  }

  const annualTax = (taxData.propertyValue * taxData.taxRate) / 100

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Property Value:</strong> ${taxData.propertyValue.toLocaleString()}
          </p>
          <p>
            <strong>Tax Rate:</strong> {taxData.taxRate}%
          </p>
          <p>
            <strong>Annual Property Tax:</strong>{" "}
            <Badge variant="outline" className="border-green-500 text-green-600">
              ${annualTax.toLocaleString()}
            </Badge>
          </p>
          <p>
            <strong>Depreciation (Annual):</strong> ${taxData.depreciation.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
