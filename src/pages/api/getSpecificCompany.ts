import prisma from '@/lib/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ticker = req.query.ticker as string

  try {
    const companyVariables = await prisma.companies.findFirst({
      where: {
        ticker,
      },
    })

    const companyAnalysis = await prisma.simpleanalysis.findFirst({
      where: {
        ticker,
      },
    })

    const companyPrice = await prisma.currentprices.findFirst({
      where: {
        ticker,
      },
    })

    const companyFundamentalAnalysis =
      await prisma.fundamentalanalysis.findFirst({
        where: {
          ticker,
        },
      })

    // Combine the values of both objects into a new object
    const companyCombinedData = {
      ...companyAnalysis,
      ...companyVariables,
      ...companyPrice,
      ...companyFundamentalAnalysis,
    }

    const companyCombinedDataWithoutId = { ...companyCombinedData }

    delete companyCombinedDataWithoutId.id

    res.status(200).json(companyCombinedDataWithoutId)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}
