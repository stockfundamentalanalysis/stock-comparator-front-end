/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentArea from '@/components/ContentArea'
import StatsBox from '@/components/StatsBox'
import NavBar from '@/components/navbar'
import { MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'

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

const PortfolioTable = () => {
  const [portfolio, setPortfolio] = useState([])
  const [totalCurrentPortfolioValueUSD, setTotalCurrentPortfolioValueUSD] =
    useState(0)
  const [totalMarginUSD, setTotalMarginUSD] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/get-portfolio')
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data')
        }
        const data = await response.json()
        setPortfolio(data)

        // Calculate totalCurrentPortfolioValueUSD
        const totalValue = data.reduce(
          (acc: any, entry: any) => acc + entry.CurrentPortfolioValueUSD,
          0
        )
        setTotalCurrentPortfolioValueUSD(totalValue)

        const totalMargin = data.reduce(
          (acc: any, entry: any) => acc + entry.MarginUSD,
          0
        )
        setTotalMarginUSD(totalMargin)
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
      }
    }
    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      {
        header: 'Company Name',
        accessorKey: 'CompanyName',
      },
      {
        header: 'Potential',
        accessorKey: 'Potential',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100)} %</StatsBox>
        },
      },
      {
        header: 'Current Price',
        accessorKey: 'CurrentPrice',
        size: 30,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Mean Buy Price',
        accessorKey: 'MeanBuyPrice',
        size: 30,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Stocks Owned',
        accessorKey: 'StocksOwned',
        size: 20,
      },

      {
        header: 'Percentual Margin',
        accessorKey: 'PercentualMargin',
        size: 10,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100)} %</StatsBox>
        },
      },
      {
        header: 'Margin USD',
        accessorKey: 'MarginUSD',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Current Value USD',
        accessorKey: 'CurrentPortfolioValueUSD',
        size: 30,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Proportion Of Portfolio',
        accessorKey: 'ProportionOfPortfolio',
        size: 20,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100)} %</StatsBox>
        },
      },

      {
        header: 'Mean Sell Price',
        accessorKey: 'MeanSellPrice',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
    ],
    []
  )

  return (
    <>
      <NavBar />
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

      <MaterialReactTable
        columns={columns}
        data={portfolio}
        enableColumnPinning={true}
        enableStickyHeader={true}
        initialState={{
          density: 'compact',
          columnPinning: { left: ['CompanyName'] },
        }}
      />
    </>
  )
}

export default PortfolioTable
