import { isNotNull } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { Prisma } from '@prisma/client'

const companiesSelect = {
  companyname: true,
  sector: true,
  longdescription: true,
  currentprice: true,
} satisfies Prisma.companiesSelect

type CompaniesPayload = Prisma.companiesGetPayload<{
  select: typeof companiesSelect
}>

const simpleAnalysisSelect = {
  targetprice: true,
  potential: true,
  growthscore: true,
  debtqualityscore: true,
  earningsscore: true,
  profitabilityscore: true,
  currency: true,
} satisfies Prisma.simpleanalysisSelect

type SimpleAnalysisPayload = Prisma.simpleanalysisGetPayload<{
  select: typeof simpleAnalysisSelect
}>

const fundamentalAnalysisSelect = {
  targetprice: true,
  currentper: true,
  currentevebitda: true,
  currentpricetofreecashflowrate: true,
  roic: true,
  netdebttoebitda: true,
} satisfies Prisma.fundamentalanalysisSelect

type FundamentalAnalysisPayload = Prisma.fundamentalanalysisGetPayload<{
  select: typeof fundamentalAnalysisSelect
}>

export type CompanyDetails = CompaniesPayload &
  SimpleAnalysisPayload &
  FundamentalAnalysisPayload

export const getCompanyDetails = async (
  ticker: string
): Promise<CompanyDetails | null> => {
  try {
    const company = await prisma.companies.findFirst({
      where: {
        ticker: {
          contains: ticker,
          mode: 'insensitive',
        },
      },
      select: companiesSelect,
    })

    const simpleanalysis = await prisma.simpleanalysis.findFirst({
      where: {
        ticker: {
          contains: ticker,
          mode: 'insensitive',
        },
      },
      select: simpleAnalysisSelect,
    })

    const fundamentalanalysis = await prisma.fundamentalanalysis.findFirst({
      where: {
        ticker: {
          contains: ticker,
          mode: 'insensitive',
        },
      },
      select: fundamentalAnalysisSelect,
    })

    if (!company || !simpleanalysis || !fundamentalanalysis) {
      return null
    }

    return {
      ...company,
      ...simpleanalysis,
      ...fundamentalanalysis,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getCompanySelector = async () => {
  const simpleanalysis = await prisma.simpleanalysis.findMany({
    select: {
      ticker: true,
      companyname: true,
      sector: true,
    },
  })

  const companies = simpleanalysis
    .map((item) => item.companyname)
    .filter(isNotNull)
    .sort()

  const sectors = simpleanalysis
    .map((item) => item.sector)
    .filter(isNotNull)
    .sort()

  const data: Record<string, { ticker: string; sector: string | null }> = {}

  for (const company of companies) {
    const item = simpleanalysis.find((item) => item.companyname === company)

    if (!item?.ticker) {
      continue
    }

    data[company] = {
      ticker: item.ticker,
      sector: item.sector,
    }
  }

  return {
    data,
    companies: Array.from(new Set(companies)),
    sectors: Array.from(new Set(sectors)),
  }
}
