"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CalculatorTab() {
  const [investment, setInvestment] = useState<number>(100000)
  const [revenue, setRevenue] = useState<number>(120000)
  const [expenses, setExpenses] = useState<number>(80000)
  const [roi, setRoi] = useState<number | null>(null)

  const calculateROI = () => {
    const netProfit = revenue - expenses
    const result = (netProfit / investment) * 100
    setRoi(result)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>ROI Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              placeholder="Investment"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="Revenue"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="Expenses"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
            />
          </div>
          <Button onClick={calculateROI}>Calculate ROI</Button>
          {roi !== null && (
            <p className="text-xl font-bold">
              ROI: {roi.toFixed(2)}%
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
