import { NextResponse } from "next/server";

export const runtime = "edge";

export default async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const zpid = searchParams.get("zpid");

    if (!zpid) {
      return NextResponse.json({ error: "Missing zpid parameter" }, { status: 400 });
    }

    const res = await fetch(
      `https://real-time-zillow-data.p.rapidapi.com/zestimate?zpid=${zpid}`,
      {
        headers: {
          "x-rapidapi-host": "real-time-zillow-data.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch Zestimate data: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Zestimate:", error);
    return NextResponse.json({ error: "Error fetching Zestimate data" }, { status: 500 });
  }
}
