"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function ComplianceChecker() {
  const complianceItems = [
    { rule: "Zoning Regulation", status: "Compliant", risk: "Low" },
    { rule: "Environmental Impact", status: "Needs Review", risk: "Medium" },
    { rule: "Building Codes", status: "Compliant", risk: "Low" },
    { rule: "Historic Preservation", status: "Violation", risk: "High" },
  ]

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-600">
          <Shield className="h-5 w-5" /> Compliance & Regulation Checker
        </CardTitle>
        <CardDescription>AI-powered legal and zoning compliance scan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {complianceItems.map((item, i) => (
          <div key={i} className="p-4 rounded-lg border bg-purple-50 border-purple-200">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{item.rule}</h4>
              <Badge
                variant="outline"
                className={`${
                  item.status === "Compliant"
                    ? "text-green-600"
                    : item.status === "Violation"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {item.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">Risk: {item.risk}</p>
          </div>
        ))}
        <Button className="w-full bg-gradient-to-r from-purple-600 to-gray-800">
          Generate Compliance Report
        </Button>
      </CardContent>
    </Card>
  )
}
