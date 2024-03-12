import { PrismaClient } from '@prisma/client'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const simpleAnalysis = await prisma.simpleAnalysis.findMany()
    res.status(200).json(simpleAnalysis)
  } catch (error) {
    console.error('Error fetching car data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  } finally {
    await prisma.$disconnect()
  }
}
