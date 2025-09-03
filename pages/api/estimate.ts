// pages/api/estimate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { projectType, squareFootage, qualityLevel, region } = req.body; // <-- use req.body here

    const prompt = `
You are a construction cost estimator for residential and commercial projects in the USA.
Estimate the total construction cost for a ${projectType} project with:
- Area: ${squareFootage} sq ft
- Quality: ${qualityLevel}
- Region: ${region}

Provide detailed breakdown in JSON format.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const content = completion.choices[0].message?.content || "{}";

    let estimate;
    try {
      estimate = JSON.parse(content);
    } catch {
      estimate = {};
    }

    res.status(200).json({ estimate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estimate: {}, error: "Error fetching estimate" });
  }
}
