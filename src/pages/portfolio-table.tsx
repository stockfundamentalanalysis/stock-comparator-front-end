import ContentArea from '@/components/ContentArea'
import DataTable from '@/components/DataTable'
import StatsBox from '@/components/StatsBox'
import NavBar from '@/components/navbar'
import { PortfolioEntry, getPortfolio } from '@/lib/prisma/portfolio'
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useMemo, useState } from 'react'

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
  data: PortfolioEntry[]
  totalCurrentPortfolioValueUSD: number
  totalMarginUSD: number
}

const columnHelper = createColumnHelper<PortfolioEntry>()

const PortfolioTable = ({
  data,
  totalCurrentPortfolioValueUSD,
  totalMarginUSD,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(
    () => [
      columnHelper.accessor('CompanyName', {
        cell: (info) => info.getValue(),
        header: () => 'Company Name',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('Potential', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100)} %</StatsBox>
        },
        size: 50,
        header: () => 'Potential',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('CurrentPrice', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 30,
        header: () => 'Current Price',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('MeanBuyPrice', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 30,
        header: () => 'Mean Buy Price',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('StocksOwned', {
        cell: (info) => info.getValue(),
        size: 20,
        header: () => 'Stocks Owned',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('PercentualMargin', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100)} %</StatsBox>
        },
        size: 10,
        header: () => 'Percentual Margin',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('MarginUSD', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 50,
        header: () => 'Margin USD',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('CurrentPortfolioValueUSD', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 30,
        header: () => 'Current Value USD',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('ProportionOfPortfolio', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100)} %</StatsBox>
        },
        size: 20,
        header: () => 'Proportion Of Portfolio',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('MeanSellPrice', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 50,
        header: () => 'Mean Sell Price',
        footer: (props) => props.column.id,
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getRowId: (row) => String(row.CompanyName),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

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

      <DataTable table={table} />
    </>
  )
}

export const getServerSideProps = (async () => {
  const data = await getPortfolio()
  const totalCurrentPortfolioValueUSD = data.reduce(
    (acc, entry) => acc + entry.CurrentPortfolioValueUSD,
    0
  )
  const totalMarginUSD = data.reduce((acc, entry) => acc + entry.MarginUSD, 0)

  return {
    props: {
      data,
      totalCurrentPortfolioValueUSD,
      totalMarginUSD,
    },
  }
}) satisfies GetServerSideProps<Props>

export default PortfolioTable
