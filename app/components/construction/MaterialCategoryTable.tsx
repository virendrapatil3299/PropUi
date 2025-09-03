"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building } from "lucide-react"

type Material = {
  name: string
  cost: number
  unit: string
  change: string
}
type Category = {
  category: string
  total: number
  materials: Material[]
}

type Props = {
  materialCategories: Category[]
}

export default function MaterialCategoryTable({ materialCategories }: Props) {
  return (
    <div className="grid gap-6">
      {materialCategories.map((category, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-accent" />
              {category.category} - ${category.total.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Material</th>
                    <th className="pb-2">Cost</th>
                    <th className="pb-2">Unit</th>
                    <th className="pb-2">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {category.materials.map((m, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2">{m.name}</td>
                      <td>${m.cost.toLocaleString()}</td>
                      <td>{m.unit}</td>
                      <td className={m.change.startsWith("+") ? "text-red-500" : "text-green-500"}>
                        {m.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
