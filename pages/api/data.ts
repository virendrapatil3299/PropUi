import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const location = (req.query.location as string) || "New York, NY"; // default if missing
    const page = req.query.page || "1";

    const url = `https://zillow-working-api.p.rapidapi.com/search/byaddress?location=${encodeURIComponent(
      location
    )}&page=${page}&sortOrder=Homes_for_you&listingStatus=For_Sale&bed_min=No_Min&bed_max=No_Max&bathrooms=Any&homeType=Houses%2C%20Townhomes%2C%20Multi-family%2C%20Condos%2FCo-ops%2C%20Lots-Land%2C%20Apartments%2C%20Manufactured&maxHOA=Any&listingType=By_Agent&listingTypeOptions=Agent%20listed%2CNew%20Construction%2CFore-closures%2CAuctions&parkingSpots=Any&mustHaveBasement=No&daysOnZillow=Any&soldInLast=Any`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key":'4fee1d963emsh707eae7d81cd817p19806ajsnbb355816c1e1',
        "x-rapidapi-host": "zillow-working-api.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch Zillow data" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server error fetching Zillow data" });
  }
}
