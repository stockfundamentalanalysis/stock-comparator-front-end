'use client'

import DataTable from '@/components/DataTable'
import StatsBox from '@/components/StatsBox'
import { PortfolioEntry } from '@/lib/prisma/portfolio'
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

const columnHelper = createColumnHelper<PortfolioEntry>()

interface Props {
  data: PortfolioEntry[]
}

const Table = ({ data }: Props) => {
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

  return <DataTable table={table} />
}

export default Table
