// pages/api/market.ts
import type { NextApiRequest, NextApiResponse } from "next";

const ATTOM_API_KEY = process.env.ATTOM_API_KEY; // store in .env.local
const GEOID = "310M200US37061"; // Example: Mecklenburg County, NC

// Fallback/mock data in case ATTOM API fails
const FALLBACK_MARKET_TREND = [
  { month: "Jan", price: 350000, inventory: 45, volume: 120 },
  { month: "Feb", price: 355000, inventory: 40, volume: 110 },
  { month: "Mar", price: 360000, inventory: 42, volume: 130 },
];

const FALLBACK_PROPERTY_TYPES = [
  { name: "Single Family", value: 60, color: "#164e63" },
  { name: "Condo", value: 25, color: "#10b981" },
  { name: "Townhome", value: 15, color: "#4a5568" },
];

const FALLBACK_NEIGHBORHOODS = [
  { name: "Downtown", avgPrice: "$360,000", growth: "+2%", trend: "up", score: 8 },
  { name: "Midtown", avgPrice: "$310,000", growth: "+1%", trend: "up", score: 7.5 },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Fetch Sales Trend
    const salesTrendRes = await fetch(
      `https://api.gateway.attomdata.com/v4/neighborhood/transaction/salestrend?geoid=${GEOID}`,
      { headers: { apikey: ATTOM_API_KEY! } }
    );

    let marketTrendData = FALLBACK_MARKET_TREND;
    if (salesTrendRes.ok) {
      const salesTrendJson = await salesTrendRes.json();
      marketTrendData = salesTrendJson.salesTrend?.map((item: any) => ({
        month: item.period,
        price: item.medianSalePrice,
        volume: item.transactionCount,
        inventory: item.monthsOfSupply,
      })) || FALLBACK_MARKET_TREND;
    } else {
      console.warn("ATTOM Sales Trend API failed, using fallback data");
    }

    // 2. Fetch AVM Snapshot
    const avmRes = await fetch(
      `https://api.gateway.attomdata.com/v4/neighborhood/avm/snapshot?geoid=${GEOID}`,
      { headers: { apikey: ATTOM_API_KEY! } }
    );

    let propertyTypeData = FALLBACK_PROPERTY_TYPES;
    if (avmRes.ok) {
      const avmJson = await avmRes.json();
      propertyTypeData = avmJson.avmSnapshot?.propertyTypeDistribution?.map((item: any) => ({
        name: item.propertyType,
        value: item.percent,
        color:
          item.propertyType === "Single Family"
            ? "#164e63"
            : item.propertyType === "Condo"
            ? "#10b981"
            : item.propertyType === "Townhome"
            ? "#4a5568"
            : "#2b6cb0",
      })) || FALLBACK_PROPERTY_TYPES;
    } else {
      console.warn("ATTOM AVM Snapshot API failed, using fallback data");
    }

    // 3. Fetch Neighborhood Data
    const neighborhoodRes = await fetch(
      `https://api.gateway.attomdata.com/v4/neighborhood/community?geoid=${GEOID}`,
      { headers: { apikey: ATTOM_API_KEY! } }
    );

    let neighborhoods = FALLBACK_NEIGHBORHOODS;
    if (neighborhoodRes.ok) {
      const neighborhoodJson = await neighborhoodRes.json();
      neighborhoods = neighborhoodJson.community?.map((item: any) => ({
        name: item.name,
        avgPrice: `$${item.medianSalePrice?.toLocaleString() || "0"}`,
        growth:
          item.priceChangePercent > 0
            ? `+${item.priceChangePercent}%`
            : `${item.priceChangePercent}%`,
        trend: item.priceChangePercent >= 0 ? "up" : "down",
        score: Math.round(item.investmentScore * 10) / 10 || 8,
      })) || FALLBACK_NEIGHBORHOODS;
    } else {
      console.warn("ATTOM Neighborhood API failed, using fallback data");
    }

    res.status(200).json({ marketTrendData, propertyTypeData, neighborhoods });
  } catch (err: any) {
    console.error("Error fetching ATTOM data:", err);
    res.status(200).json({
      marketTrendData: FALLBACK_MARKET_TREND,
      propertyTypeData: FALLBACK_PROPERTY_TYPES,
      neighborhoods: FALLBACK_NEIGHBORHOODS,
    });
  }
}
