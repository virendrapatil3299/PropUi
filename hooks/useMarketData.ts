"use client"

import { useEffect, useState } from "react"

export function useMarketData(region: string, timeframe: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // Example: Zillow RapidAPI endpoint (replace with ATTOM if needed)
        const res = await fetch(
          `https://zillow-working-api.p.rapidapi.com/housing_market?search_query=${region}&home_type=All_Homes&exclude_rentalMarketTrends=true&exclude_neighborhoods_zhvi=true`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "zillow-working-api.p.rapidapi.com",
              "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!, // keep in .env
            },
          }
        )

        if (!res.ok) throw new Error("Failed to fetch market data")
        const json = await res.json()

        // filter by timeframe (if API returns historical data)
        setData(json)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [region, timeframe])

  return { data, loading, error }
}
