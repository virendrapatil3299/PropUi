"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { TrendingUp } from "lucide-react"

const forecastData = [
  { year: 2024, price: 500000 },
  { year: 2025, price: 545000 },
  { year: 2026, price: 600000 },
  { year: 2027, price: 660000 },
  { year: 2028, price: 725000 },
]

export function Forecasting() {
  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-600">
          <TrendingUp className="h-5 w-5" /> AI Market Forecasting
        </CardTitle>
        <CardDescription>Predictive property value growth</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#7e22ce" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
