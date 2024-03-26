import ContentArea from '@/components/ContentArea'

const KpiCard = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <div className="truncate text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {children}
      </div>
    </div>
  )
}

interface Props {
  totalCurrentPortfolioValueUSD: number
  totalMarginUSD: number
}

const TotalsArea = ({
  totalCurrentPortfolioValueUSD,
  totalMarginUSD,
}: Props) => {
  return (
    <ContentArea>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
        <KpiCard title="Total Current Portfolio Value">
          {Math.round(totalCurrentPortfolioValueUSD)} $
        </KpiCard>
        <KpiCard title="Total Earnings/Losses">
          {Math.round(totalMarginUSD)} $
        </KpiCard>
      </div>
    </ContentArea>
  )
}

export default TotalsArea
