"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Calculator,
  DollarSign,
  TrendingUp,
  PieChart,
  CreditCard,
  Percent,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  LineChart,
  Receipt,
} from "lucide-react"

export function FinancialPlanning() {
  const [loanAmount, setLoanAmount] = useState([800000])
  const [interestRate, setInterestRate] = useState([4.5])
  const [loanTerm, setLoanTerm] = useState([30])
  const [downPayment, setDownPayment] = useState([200000])
  const [selectedScenario, setSelectedScenario] = useState("conservative")

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
    {
      type: "FHA Loan",
      rate: "4.75%",
      downPayment: "3.5%",
      monthlyPayment: "$4,187",
      totalInterest: "$708,320",
      pros: ["Lower down payment", "Flexible credit"],
      cons: ["Mortgage insurance required", "Higher rates"],
    },
    {
      type: "Investment Property Loan",
      rate: "5.25%",
      downPayment: "25%",
      monthlyPayment: "$4,142",
      totalInterest: "$790,320",
      pros: ["Investment property eligible", "Tax benefits"],
      cons: ["Higher rates", "Larger down payment"],
    },
    {
      type: "Portfolio Loan",
      rate: "4.85%",
      downPayment: "30%",
      monthlyPayment: "$3,721",
      totalInterest: "$639,560",
      pros: ["Flexible terms", "Multiple properties"],
      cons: ["Bank specific", "Higher down payment"],
    },
  ]

  const cashFlowProjections = [
    { year: 1, income: 102000, expenses: 45000, cashFlow: 57000, roi: "12.5%" },
    { year: 2, income: 107100, expenses: 46800, cashFlow: 60300, roi: "13.2%" },
    { year: 3, income: 112455, expenses: 48672, cashFlow: 63783, roi: "14.0%" },
    { year: 4, income: 118078, expenses: 50619, cashFlow: 67459, roi: "14.8%" },
    { year: 5, income: 123982, expenses: 52644, cashFlow: 71338, roi: "15.6%" },
  ]

  const taxOptimization = [
    { strategy: "Depreciation Deduction", savings: "$8,500", description: "Annual depreciation on building value" },
    { strategy: "Mortgage Interest", savings: "$34,200", description: "Deductible mortgage interest payments" },
    { strategy: "Property Taxes", savings: "$12,800", description: "Local property tax deductions" },
    { strategy: "Repairs & Maintenance", savings: "$4,200", description: "Deductible property expenses" },
    { strategy: "1031 Exchange", savings: "$45,000", description: "Defer capital gains taxes" },
  ]

  const scenarios = {
    conservative: { appreciation: 3, vacancy: 8, expenses: 35 },
    moderate: { appreciation: 5, vacancy: 5, expenses: 30 },
    aggressive: { appreciation: 7, vacancy: 3, expenses: 25 },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Financial Planning Tools</h2>
          <p className="text-muted-foreground">Comprehensive financial modeling and optimization</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedScenario} onValueChange={setSelectedScenario}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservative">Conservative</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="aggressive">Aggressive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="financing">Financing</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="tax">Tax Planning</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="financing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" />
                  Loan Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Loan Amount: ${loanAmount[0].toLocaleString()}</Label>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    max={2000000}
                    min={100000}
                    step={10000}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate: {interestRate[0]}%</Label>
                  <Slider
                    value={interestRate}
                    onValueChange={setInterestRate}
                    max={8}
                    min={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loan Term: {loanTerm[0]} years</Label>
                  <Slider value={loanTerm} onValueChange={setLoanTerm} max={40} min={10} step={5} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>Down Payment: ${downPayment[0].toLocaleString()}</Label>
                  <Slider
                    value={downPayment}
                    onValueChange={setDownPayment}
                    max={500000}
                    min={50000}
                    step={5000}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-xl font-bold text-primary">$3,947</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-600">Total Interest</p>
                    <p className="text-xl font-bold text-blue-700">$621K</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-600">Total Cost</p>
                    <p className="text-xl font-bold text-green-700">$1.42M</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-600">LTV Ratio</p>
                    <p className="text-xl font-bold text-purple-700">80%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Principal & Interest</span>
                    <span className="font-semibold">$3,947</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Property Taxes</span>
                    <span className="font-semibold">$1,067</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Insurance</span>
                    <span className="font-semibold">$283</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Monthly</span>
                      <span>$5,297</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financingOptions.map((option, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {option.type}
                    <Badge className="bg-accent/10 text-accent border-accent/20">{option.rate}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Down Payment</p>
                      <p className="font-semibold">{option.downPayment}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold">{option.monthlyPayment}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      Total Interest: <span className="font-semibold">{option.totalInterest}</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-medium text-green-600 mb-1">Pros:</p>
                      <ul className="space-y-1">
                        {option.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-orange-600 mb-1">Cons:</p>
                      <ul className="space-y-1">
                        {option.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Select Option
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-accent" />
                5-Year Cash Flow Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Year</th>
                      <th className="text-right py-2">Rental Income</th>
                      <th className="text-right py-2">Expenses</th>
                      <th className="text-right py-2">Net Cash Flow</th>
                      <th className="text-right py-2">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashFlowProjections.map((projection, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 font-medium">Year {projection.year}</td>
                        <td className="text-right py-3 text-green-600 font-semibold">
                          ${projection.income.toLocaleString()}
                        </td>
                        <td className="text-right py-3 text-red-600">${projection.expenses.toLocaleString()}</td>
                        <td className="text-right py-3 font-bold text-primary">
                          ${projection.cashFlow.toLocaleString()}
                        </td>
                        <td className="text-right py-3">
                          <Badge className="bg-green-100 text-green-800">{projection.roi}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Revenue Streams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Base Rent</span>
                  <span className="font-semibold">$8,500/mo</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Parking</span>
                  <span className="font-semibold">$200/mo</span>
                </div>
                <Progress value={20} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage</span>
                  <span className="font-semibold">$100/mo</span>
                </div>
                <Progress value={10} className="h-2" />
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Monthly</span>
                    <span>$8,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-red-600" />
                  Operating Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Property Management</span>
                  <span className="font-semibold">$880/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Insurance</span>
                  <span className="font-semibold">$283/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maintenance</span>
                  <span className="font-semibold">$500/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vacancy Reserve</span>
                  <span className="font-semibold">$440/mo</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Monthly</span>
                    <span>$2,103</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cap Rate</span>
                  <span className="font-semibold text-green-600">6.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cash-on-Cash</span>
                  <span className="font-semibold text-blue-600">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">DSCR</span>
                  <span className="font-semibold text-purple-600">1.35</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Break-even</span>
                  <span className="font-semibold">$5,297/mo</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <Card
                key={key}
                className={`glass-card hover-lift cursor-pointer transition-all ${
                  selectedScenario === key ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setSelectedScenario(key)}
              >
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    {key} Scenario
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Appreciation</span>
                      <span className="font-semibold text-green-600">{scenario.appreciation}%/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vacancy Rate</span>
                      <span className="font-semibold text-orange-600">{scenario.vacancy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expense Ratio</span>
                      <span className="font-semibold text-red-600">{scenario.expenses}%</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">10-Year ROI</p>
                      <p className="text-2xl font-bold text-primary">
                        {key === "conservative" ? "185%" : key === "moderate" ? "245%" : "320%"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Scenario Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive scenario comparison chart would be rendered here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-accent" />
                  Tax Optimization Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {taxOptimization.map((strategy, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{strategy.strategy}</p>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{strategy.savings}</p>
                      <p className="text-xs text-muted-foreground">Annual</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Tax Savings</span>
                    <span className="text-2xl font-bold text-green-600">$104,700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Tax Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-800">Q1 Estimated Taxes</p>
                      <p className="text-sm text-blue-600">Due: January 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-800">Property Tax Assessment</p>
                      <p className="text-sm text-green-600">Completed: March 1, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-orange-800">Depreciation Schedule</p>
                      <p className="text-sm text-orange-600">Review: April 15, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Investment Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchase-price">Purchase Price</Label>
                    <Input id="purchase-price" placeholder="$1,000,000" />
                  </div>
                  <div>
                    <Label htmlFor="down-payment-calc">Down Payment</Label>
                    <Input id="down-payment-calc" placeholder="$200,000" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-rent">Monthly Rent</Label>
                    <Input id="monthly-rent" placeholder="$8,500" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-expenses">Monthly Expenses</Label>
                    <Input id="monthly-expenses" placeholder="$2,100" />
                  </div>
                  <div>
                    <Label htmlFor="appreciation-rate">Appreciation Rate</Label>
                    <Input id="appreciation-rate" placeholder="5%" />
                  </div>
                  <div>
                    <Label htmlFor="holding-period">Holding Period</Label>
                    <Input id="holding-period" placeholder="10 years" />
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Calculate Returns</Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-accent" />
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Initial Investment</span>
                    <span className="font-bold">$250,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Cash Flow</span>
                    <span className="font-bold text-green-600">$76,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>10-Year Cash Flow</span>
                    <span className="font-bold text-green-600">$768,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Property Appreciation</span>
                    <span className="font-bold text-blue-600">$628,895</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Return</span>
                      <span className="text-2xl font-bold text-primary">$1,396,895</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-semibold">Total ROI</span>
                      <span className="text-2xl font-bold text-accent">558%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
