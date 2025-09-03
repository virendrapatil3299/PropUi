"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export function CashFlowTab() {
  const cashFlowItems = [
    {
      month: "Jan",
      income: 15000,
      expenses: 12000,
      net: 3000,
    },
    {
      month: "Feb",
      income: 15500,
      expenses: 12500,
      net: 3000,
    },
    {
      month: "Mar",
      income: 16000,
      expenses: 13000,
      net: 3000,
    },
  ]

  const summary = {
    avgIncome: 15500,
    avgExpenses: 12500,
    avgNet: 3000,
    trend: "positive",
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Avg Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${summary.avgIncome.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Avg Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${summary.avgExpenses.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {summary.trend === "positive" ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${summary.avgNet.toLocaleString()}</p>
            <Badge
              variant="outline"
              className={`mt-2 ${
                summary.trend === "positive"
                  ? "border-green-500 text-green-600"
                  : "border-red-500 text-red-600"
              }`}
            >
              {summary.trend === "positive" ? "Positive" : "Negative"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Monthly cash flow table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Monthly Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 font-semibold border-b pb-2">
            <div>Month</div>
            <div>Income</div>
            <div>Expenses</div>
            <div>Net</div>
          </div>
          {cashFlowItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-4 py-2 border-b last:border-0"
            >
              <div>{item.month}</div>
              <div className="text-green-600">${item.income.toLocaleString()}</div>
              <div className="text-red-600">${item.expenses.toLocaleString()}</div>
              <div
                className={
                  item.net >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                }
              >
                ${item.net.toLocaleString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
