import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const simpleAnalysis = await prisma.simpleAnalysis.findMany({
      select: {
        Ticker: true,
        CompanyName: true,
        Sector: true,
      },
    })
    res.status(200).json(simpleAnalysis)
  } catch (error) {
    console.error('Error fetching car data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  } finally {
    await prisma.$disconnect()
  }
}
