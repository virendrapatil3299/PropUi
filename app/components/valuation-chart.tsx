"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { motion } from "framer-motion"

const valuationData = [
  { month: "Jan", value: 750000, predicted: 755000, market: 740000 },
  { month: "Feb", value: 765000, predicted: 770000, market: 750000 },
  { month: "Mar", value: 780000, predicted: 785000, market: 765000 },
  { month: "Apr", value: 795000, predicted: 800000, market: 780000 },
  { month: "May", value: 810000, predicted: 815000, market: 795000 },
  { month: "Jun", value: 825000, predicted: 830000, market: 810000 },
  { month: "Jul", value: 840000, predicted: 845000, market: 825000 },
  { month: "Aug", value: 850000, predicted: 860000, market: 835000 },
]

const comparativeData = [
  { category: "Location", score: 92, benchmark: 85 },
  { category: "Condition", score: 88, benchmark: 80 },
  { category: "Size", score: 85, benchmark: 82 },
  { category: "Amenities", score: 90, benchmark: 78 },
  { category: "Market Trend", score: 94, benchmark: 88 },
]

export function ValuationChart() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Property Valuation Trends */}
      <Card className=" text-purple-100 shadow-lg border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">Property Valuation Trends</CardTitle>
          <CardDescription className="text-purple-200/80">
            AI-powered valuation analysis with market predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valuationData}>
                <defs>
                  <linearGradient id="linePurpleBlack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                  <linearGradient id="linePrediction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                  <linearGradient id="lineMarket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b21a8" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                <XAxis dataKey="month" stroke="purple" fontSize={12} />
                <YAxis
                  stroke="purple"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #7c3aed",
                    borderRadius: "8px",
                    color: "#e9d5ff",
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#linePurpleBlack)"
                  strokeWidth={3}
                  name="Current Value"
                  dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                  isAnimationActive
                  animationDuration={1200}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="url(#linePrediction)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="AI Prediction"
                  dot={{ fill: "#9333ea", strokeWidth: 2, r: 3 }}
                  isAnimationActive
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="market"
                  stroke="url(#lineMarket)"
                  strokeWidth={2}
                  name="Market Average"
                  dot={{ fill: "#6b21a8", strokeWidth: 2, r: 3 }}
                  isAnimationActive
                  animationDuration={1800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Factors Analysis */}
      <Card className=" text-purple-100 shadow-lg border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">Valuation Factors Analysis</CardTitle>
          <CardDescription className="text-purple-200/80">
            How this property compares to market benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparativeData} layout="horizontal">
                <defs>
                  <linearGradient id="barBenchmark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6b21a8" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                  <linearGradient id="barScore" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                <XAxis type="number" domain={[0, 100]} stroke="purple" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="purple"
                  fontSize={12}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #7c3aed",
                    borderRadius: "8px",
                    color: "#e9d5ff",
                  }}
                />
                <Bar
                  dataKey="benchmark"
                  fill="url(#barBenchmark)"
                  name="Market Benchmark"
                  radius={[0, 6, 6, 0]}
                  isAnimationActive
                  animationDuration={1200}
                />
                <Bar
                  dataKey="score"
                  fill="url(#barScore)"
                  name="Property Score"
                  radius={[0, 6, 6, 0]}
                  isAnimationActive
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
