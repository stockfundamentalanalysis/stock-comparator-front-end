'use client'

import DataTable from '@/components/DataTable'
import StatsBox from '@/components/StatsBox'
import { calculateWeight, pickColor } from '@/lib/colorPicker'
import { SimpleAnalysis } from '@/lib/prisma/simpleAnalysis'
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const columnHelper = createColumnHelper<SimpleAnalysis>()

interface Props {
  data: SimpleAnalysis[]
}

const Table = ({ data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(
    () => [
      columnHelper.accessor('ticker', {
        cell: ({ cell }) => {
          const route = '/detail/' + cell.getValue()?.toLowerCase()

          return (
            <Link href={route} className="font-semibold underline">
              {cell.getValue()}
            </Link>
          )
        },
        size: 50,
        header: () => 'Ticker',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('companyname', {
        cell: (info) => info.getValue(),
        header: () => 'CompanyName',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('sector', {
        cell: (info) => info.getValue(),
        header: () => 'Sector',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('potential', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, -1, 1.5)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Potential',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('targetprice', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 50,
        header: () => 'Target Price',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currency', {
        cell: (info) => info.getValue(),
        size: 50,
        header: () => 'Currency',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('debtqualityscore', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'DebtQuality Score',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('earningsscore', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Earnings Score',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('profitabilityscore', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Profitability Score',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('growthscore', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Growth Score',
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
    getRowId: (row) => String(row.ticker),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return <DataTable table={table} />
}

export default Table
