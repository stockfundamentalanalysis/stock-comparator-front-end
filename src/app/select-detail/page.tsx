import CompanySelector from '@/components/Pages/SelectDetail/CompanySelector'
import { isNotNull } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'

type Data = Record<string, { ticker: string; sector: string | null }>

interface GetData {
  data: Data
  companies: string[]
  sectors: string[]
}

async function getData(): Promise<GetData> {
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

export default async function Page() {
  const { data, companies, sectors } = await getData()

  return <CompanySelector data={data} companies={companies} sectors={sectors} />
}
