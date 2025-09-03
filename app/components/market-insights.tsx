"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion"; // ✅ import Variants
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  Building,
  DollarSign,
} from "lucide-react";

export function MarketInsights() {
  const [data, setData] = useState<{
    marketTrendData?: any[];
    propertyTypeData?: any[];
    neighborhoods?: any[];
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/market");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading market data...</p>;
  if (!data) return <p>Failed to load market data.</p>;

  const marketTrendData = data.marketTrendData ?? [];
  const propertyTypeData = data.propertyTypeData ?? [];
  const neighborhoods = data.neighborhoods ?? [];

  const lastTrend = marketTrendData[marketTrendData.length - 1];

  // ✅ Reusable fade/slide animation with Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut", // ✅ valid easing type
      },
    }),
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Median Home Price",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            value: lastTrend ? `$${(lastTrend.price / 1000).toFixed(0)}K` : "-",
            sub: marketTrendData.length
              ? `+${(
                  ((lastTrend.price - marketTrendData[0].price) /
                    marketTrendData[0].price) *
                  100
                ).toFixed(1)}% YoY`
              : "-",
            trendIcon: <TrendingUp className="h-3 w-3 mr-1" />,
          },
          {
            title: "Days on Market",
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            value: lastTrend?.inventory ?? "-",
            sub: "-12 days vs last year",
            trendIcon: <TrendingDown className="h-3 w-3 mr-1" />,
          },
          {
            title: "Inventory Level",
            icon: <Building className="h-4 w-4 text-muted-foreground" />,
            value: lastTrend?.inventory ?? "-",
            sub: "Months of supply (Seller's market)",
          },
          {
            title: "Market Temperature",
            icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            value: "Hot",
            progress: 85,
          },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeUp} custom={i}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{item.value}</div>
                {item.sub && (
                  <p className="text-xs text-muted-foreground flex items-center">
                    {item.trendIcon} {item.sub}
                  </p>
                )}
                {item.progress && (
                  <Progress value={item.progress} className="mt-2" />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} custom={1}>
          <Card>
            <CardHeader>
              <CardTitle>Market Price Trends</CardTitle>
              <CardDescription>Median home prices over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${value?.toLocaleString()}`,
                        "Median Price",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} custom={2}>
          <Card>
            <CardHeader>
              <CardTitle>Property Type Distribution</CardTitle>
              <CardDescription>
                Market share by property type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Market Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {propertyTypeData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Neighborhood Analysis */}
      <motion.div variants={fadeUp} custom={3}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Neighborhood Analysis
            </CardTitle>
            <CardDescription>
              AI-powered insights for top performing neighborhoods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {neighborhoods.map((n, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{n.name}</h3>
                      <Badge
                        variant={n.trend === "up" ? "default" : "destructive"}
                      >
                        {n.growth}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {n.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-accent" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Avg Price</p>
                        <p className="font-semibold text-primary">
                          {n.avgPrice}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Investment Score
                        </p>
                        <p className="font-semibold">{n.score}/10</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Market Strength
                        </p>
                        <Progress value={n.score * 10} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
