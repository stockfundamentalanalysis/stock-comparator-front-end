import { createRequire } from 'module'
import { PrismaClient } from '@prisma/client'
const require = createRequire(import.meta.url)

const prisma = new PrismaClient()

export default async function handler(req, res) {
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
