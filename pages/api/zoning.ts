// pages/api/zoning.ts
import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { address, cityStateZip } = req.body

    if (!address || !cityStateZip) {
      return res.status(400).json({ error: "Missing address or cityStateZip" })
    }

    // 1. Call Attom API
    const attomRes = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address1=${encodeURIComponent(
        address
      )}&address2=${encodeURIComponent(cityStateZip)}`,
      {
        headers: { apikey: process.env.ATTOM_API_KEY ?? "" },
      }
    )

    const attomText = await attomRes.text()
    let attomData: any = {}

    try {
      attomData = JSON.parse(attomText)
    } catch {
      console.error("Failed to parse Attom response:", attomText)
      return res.status(500).json({ error: "Invalid Attom response format", raw: attomText })
    }

    // If Attom found nothing, return gracefully
    if (!attomData.property || attomData.property.length === 0) {
      return res.status(404).json({
        error: "No property found for this address",
        details: attomData.status ?? {},
      })
    }

    // 2. Call OpenAI for insights
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const prompt = `
You are a zoning and real estate expert.
Analyze this property:
${JSON.stringify(attomData, null, 2)}

Return JSON with:
{
  "strategies": [
    { "zoning": "Mixed-Use", "summary": "why it works", "feasibility": "High" }
  ],
  "compliance": [
    { "item": "Height Restriction", "status": "warning" }
  ]
}
    `

    const aiRes = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
      
    })

    let insights: any = {}
    try {
      insights = JSON.parse(aiRes.choices[0].message.content ?? "{}")
    } catch (e) {
      console.error("OpenAI JSON parse error:", e, aiRes.choices[0].message.content)
      insights = { error: "Invalid AI response" }
    }

    return res.status(200).json({
      property: attomData.property?.[0] || {},
      optimization: insights,
    })
  } catch (err: any) {
    console.error("Server error:", err)
    return res.status(500).json({ error: err.message })
  }
}
