"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

export function TaxOptimization() {
  const [investmentAmount, setInvestmentAmount] = useState("500000")

  const taxOptimizations = [
    { strategy: "1031 Exchange", savings: "$45,000", timeline: "6 months", complexity: "Medium" },
    { strategy: "Depreciation Acceleration", savings: "$28,000", timeline: "1 year", complexity: "Low" },
    { strategy: "Opportunity Zone Investment", savings: "$67,000", timeline: "10 years", complexity: "High" },
    { strategy: "Cost Segregation Study", savings: "$35,000", timeline: "3 months", complexity: "Medium" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <Calculator className="h-5 w-5" />
            Tax Optimization Strategies
          </CardTitle>
          <CardDescription>AI-recommended tax savings opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {taxOptimizations.map((strategy, i) => (
            <div key={i} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-purple-800">{strategy.strategy}</h4>
                <Badge variant="outline" className="text-xs">{strategy.complexity}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Potential Savings</p>
                  <p className="font-bold text-green-600">{strategy.savings}</p>
                </div>
                <div>
                  <p className="text-gray-600">Timeline</p>
                  <p className="font-semibold">{strategy.timeline}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-3 w-full">Learn More</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-600">Tax Calculator</CardTitle>
          <CardDescription>Estimate your tax savings potential</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="investment">Investment Amount</Label>
            <Input
              id="investment"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="500000"
            />
          </div>

          <div>
            <Label>Tax Strategy</Label>
            <Select defaultValue="1031-exchange">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1031-exchange">1031 Exchange</SelectItem>
                <SelectItem value="depreciation">Depreciation</SelectItem>
                <SelectItem value="opportunity-zone">Opportunity Zone</SelectItem>
                <SelectItem value="cost-segregation">Cost Segregation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Estimated Savings</h4>
            <div className="text-2xl font-bold text-green-600 mb-1">$45,000</div>
            <p className="text-sm text-green-700">Annual tax reduction</p>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-600 to-gray-800">
            Generate Tax Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
