import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    location = "10001",
    agentName = "",
    page = "1",
    filter = "",
    priceRange = "",
    specialty = "",
    language = "",
  } = req.query;

  try {
    const response = await fetch(
      `https://zillow-working-api.p.rapidapi.com/agent/search?location=${location}&agentName=${agentName}&page=${page}&filter=${filter}&priceRange=${priceRange}&specialty=${specialty}&language=${language}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
          "X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch agents" });
    }

    const data = await response.json();

    res.status(200).json({
      agents: data?.agents || [],
      total: data?.total || 0,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
