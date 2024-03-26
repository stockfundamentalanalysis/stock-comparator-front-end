import prisma from '@/lib/prisma/client'
import { Prisma } from '@prisma/client'

const companiesSelect = {
  companyname: true,
  sector: true,
  longdescription: true,
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

const currentPricesSelect = {
  price: true,
} satisfies Prisma.currentpricesSelect

type CurrentPricesPayload = Prisma.currentpricesGetPayload<{
  select: typeof currentPricesSelect
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
  CurrentPricesPayload &
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

    const currentprice = await prisma.currentprices.findFirst({
      where: {
        ticker: {
          contains: ticker,
          mode: 'insensitive',
        },
      },
      select: currentPricesSelect,
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

    if (!company || !simpleanalysis || !currentprice || !fundamentalanalysis) {
      return null
    }

    return {
      ...company,
      ...simpleanalysis,
      ...currentprice,
      ...fundamentalanalysis,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
