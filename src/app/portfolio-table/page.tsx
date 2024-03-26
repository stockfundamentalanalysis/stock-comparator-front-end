import Table from '@/components/Pages/PortfolioTable/Table'
import TotalsArea from '@/components/Pages/PortfolioTable/TotalsArea'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import { getPortfolio } from '@/lib/prisma/portfolio'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio Table',
  alternates: {
    canonical: canonicalBuilder('portfolio-table'),
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Portfolio Table',
    url: canonicalBuilder('portfolio-table'),
  },
}

export default async function Page() {
  const data = await getPortfolio()
  const totalCurrentPortfolioValueUSD = data.reduce(
    (acc, entry) => acc + entry.CurrentPortfolioValueUSD,
    0
  )
  const totalMarginUSD = data.reduce((acc, entry) => acc + entry.MarginUSD, 0)

  return (
    <>
      <TotalsArea
        totalCurrentPortfolioValueUSD={totalCurrentPortfolioValueUSD}
        totalMarginUSD={totalMarginUSD}
      />
      <Table data={data} />
    </>
  )
}
