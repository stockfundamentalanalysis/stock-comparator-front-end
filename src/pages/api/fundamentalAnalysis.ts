import prisma from '@/lib/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const fundamentalAnalysis = await prisma.fundamentalAnalysis.findMany()
    res.status(200).json(fundamentalAnalysis)
  } catch (error) {
    console.error('Error fetching company data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  } finally {
    await prisma.$disconnect()
  }
}
