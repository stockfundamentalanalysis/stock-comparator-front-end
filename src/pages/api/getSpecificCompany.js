import { createRequire } from 'module'
import { PrismaClient } from '@prisma/client'

const require = createRequire(import.meta.url)

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    query: { ticker },
  } = req
  try {
    const companyAnalysis = await prisma.simpleAnalysis.findFirst({
      where: {
        Ticker: ticker,
      },
    })

    const companyVariables = await prisma.Companies.findFirst({
      where: {
        Ticker: ticker,
      },
    })

    const companyPrice = await prisma.CurrentPrice.findFirst({
      where: {
        Ticker: ticker,
      },
    })

    const companyFundamentalAnalysis =
      await prisma.fundamentalAnalysis.findFirst({
        where: {
          Ticker: ticker,
        },
      })

    // Combine the values of both objects into a new object
    const companyCombinedData = {
      ...companyAnalysis,
      ...companyVariables,
      ...companyPrice,
      ...companyFundamentalAnalysis,
    }

    res.status(200).json(companyCombinedData)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  } finally {
    await prisma.$disconnect()
  }
}
