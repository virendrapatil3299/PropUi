"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, HardHat, Package, Wrench, Truck } from "lucide-react";

export default function ConstructionCostEstimator() {
  const [projectType, setProjectType] = useState("residential");
  const [squareFootage, setSquareFootage] = useState(2500);
  const [qualityLevel, setQualityLevel] = useState("standard");
  const [region, setRegion] = useState("manhattan");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<any>({ materials: [], labor: [], scenarios: [] });

  const fetchEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType, squareFootage, qualityLevel, region }),
      });
      const data = await res.json();
      setEstimate(data.estimate);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Construction Cost Estimator</h2>
          <p className="text-muted-foreground">AI-powered material and labor cost predictions</p>
        </div>
        <div className="flex gap-2">
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-primary to-accent" onClick={fetchEstimate}>
            <Calculator className="h-4 w-4 mr-2" /> Estimate
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        {/* Materials */}
        <TabsContent value="materials" className="space-y-4">
          {loading ? (
            <p>Loading materials...</p>
          ) : (
            estimate.materials.map((cat: any, idx: number) => (
              <Card key={idx}>
                <CardHeader className="flex items-center gap-2">
                  {cat.category === "Foundation & Structure" && <HardHat className="h-5 w-5" />}
                  {cat.category === "Exterior & Roofing" && <Package className="h-5 w-5" />}
                  {cat.category === "Interior Finishes" && <Wrench className="h-5 w-5" />}
                  {cat.category === "MEP Systems" && <Truck className="h-5 w-5" />}
                  <CardTitle>{cat.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {cat.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.material}</span>
                      <span>{item.totalCost}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Labor */}
        <TabsContent value="labor" className="space-y-4">
          {loading ? (
            <p>Loading labor costs...</p>
          ) : (
            estimate.labor.map((l: any, idx: number) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{l.trade}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between text-sm">
                  <span>{l.description}</span>
                  <span>{l.total}</span>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Scenarios */}
        <TabsContent value="scenarios" className="space-y-4">
          {loading ? (
            <p>Loading scenarios...</p>
          ) : (
            estimate.scenarios.map((s: any, idx: number) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{s.name} - {s.totalCost}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{s.description}</p>
                  <p>Cost per sq ft: {s.costPerSqFt}</p>
                  <p>Timeline: {s.timeline}</p>
                  <p>Savings: {s.savings}</p>
                  <ul className="list-disc ml-5">
                    {s.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Calculator */}
        <TabsContent value="calculator">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" /> Estimate Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <p>Loading...</p> : <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(estimate, null, 2)}</pre>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
