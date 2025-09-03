// Next.js example in an API route (e.g. /api/calc-payment)
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { loanAmount, interestRate, durationYears } = req.query
  const url = new URL('https://api.api-ninjas.com/v1/mortgagecalculator')
  url.searchParams.append('loan_amount', String(loanAmount))
  url.searchParams.append('interest_rate', String(interestRate))
  url.searchParams.append('duration_years', String(durationYears))

  const resp = await fetch(url.toString(), {
    headers: { 'X-Api-Key': process.env.API_NINJAS_KEY! }
  })
  const data = await resp.json()
  res.status(200).json(data)
}
