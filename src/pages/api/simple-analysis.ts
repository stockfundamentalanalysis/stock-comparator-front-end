import prisma from '@/lib/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const simpleAnalysis = await prisma.simpleanalysis.findMany()
    res
      .status(200)
      .json(simpleAnalysis.map((item) => ({ ...item, id: Number(item.id) })))
  } catch (error) {
    console.error('Error fetching car data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}
