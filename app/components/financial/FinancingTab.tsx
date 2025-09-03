"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, CreditCard, CheckCircle, AlertTriangle } from "lucide-react"

export function FinancingTab() {
  const financingOptions = [
    {
      type: "Conventional Loan",
      rate: "4.25%",
      downPayment: "20%",
      monthlyPayment: "$3,947",
      totalInterest: "$621,032",
      pros: ["Lower rates", "No PMI with 20% down"],
      cons: ["Strict credit requirements", "Higher down payment"],
    },
    // ...rest
  ]

  return (
    <div className="space-y-6">
      {/* Loan parameters + Payment summary here (your original JSX) */}

      {/* Financing options list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {financingOptions.map((option, index) => (
          <Card key={index} className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                {option.type}
                <Badge className="bg-accent/10 text-accent border-accent/20">{option.rate}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Pros / Cons UI here */}
              <Button variant="outline" size="sm" className="w-full bg-transparent">Select Option</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
