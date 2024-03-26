import { Prisma } from '@prisma/client'

export const simpleAnalysisSelect = {
  ticker: true,
  companyname: true,
  potential: true,
  targetprice: true,
  currency: true,
  debtqualityscore: true,
  earningsscore: true,
  profitabilityscore: true,
  growthscore: true,
  sector: true,
} satisfies Prisma.simpleanalysisSelect

export type SimpleAnalysis = Prisma.simpleanalysisGetPayload<{
  select: typeof simpleAnalysisSelect
}>
