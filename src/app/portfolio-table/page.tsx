import Table from '@/components/Pages/PortfolioTable/Table'
import TotalsArea from '@/components/Pages/PortfolioTable/TotalsArea'
import { getPortfolio } from '@/lib/prisma/portfolio'

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
