import type { NextApiRequest, NextApiResponse } from 'next';

type Suggestion = {
  text: string;
  address: string;
  city: string;
  postal_code: string;
  state_code: string;
};

type HomesageResponse = {
  outcome: string;
  data: Suggestion[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.query;
  if (!input || typeof input !== 'string' || input.length < 2) {
    res.status(400).json({ error: 'Invalid input. Provide at least 2 characters.' });
    return;
  }

  const url = `${process.env.HOMESAGE_BASE_URL}/api/properties/auto-complete/?input=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.HOMESAGE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({ error: errorText });
      return;
    }

    const data: HomesageResponse = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
