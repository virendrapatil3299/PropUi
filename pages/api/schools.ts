import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { state, city } = req.query;

    if (!state || !city) {
      return res.status(400).json({ error: 'State and city are required' });
    }

    const appID = process.env.SCHOOLDIGGER_APP_ID;
    const API_KEY = process.env.SCHOOLDIGGER_API_KEY;

    if (!appID || !API_KEY) {
      return res.status(500).json({ error: 'API ID or key not configured' });
    }

    // Encode parameters to handle spaces/special characters
    const encodedCity = encodeURIComponent(city as string);
    const encodedState = encodeURIComponent(state as string);

    // Fetch schools in the given state and city
    const url = `https://api.schooldigger.com/v2.0/schools?st=${encodedState}&city=${encodedCity}&appID=${appID}&appKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('SchoolDigger API Error:', data);
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error('Server Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
