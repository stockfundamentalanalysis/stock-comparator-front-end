import prisma from '@/lib/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const fundamentalAnalysis = await prisma.fundamentalanalysis.findMany()
    res
      .status(200)
      .json(
        fundamentalAnalysis.map((item) => ({ ...item, id: Number(item.id) }))
      )
  } catch (error) {
    console.error('Error fetching company data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}
