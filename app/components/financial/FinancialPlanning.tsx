"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator } from "lucide-react"

import { FinancingTab } from "./FinancingTab"
import { CashFlowTab } from "./CashFlowTab"
import { ScenariosTab } from "./ScenariosTab"
import { TaxTab } from "./TaxTab"
import { CalculatorTab } from "./CalculatorTab"

export function FinancialPlanning() {
  const [loanAmount, setLoanAmount] = useState([800000])
  const [interestRate, setInterestRate] = useState([4.5])
  const [loanTerm, setLoanTerm] = useState([30])
  const [downPayment, setDownPayment] = useState([200000])
  const [selectedScenario, setSelectedScenario] = useState("conservative")

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Tabs */}
      <Tabs defaultValue="financing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="financing">Financing</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="tax">Tax Planning</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="financing">
          <FinancingTab
            
            
         
          />
        </TabsContent>

        <TabsContent value="cashflow">
          <CashFlowTab />
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenariosTab  />
        </TabsContent>

        <TabsContent value="tax">
          <TaxTab />
        </TabsContent>

        <TabsContent value="calculator">
          <CalculatorTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
