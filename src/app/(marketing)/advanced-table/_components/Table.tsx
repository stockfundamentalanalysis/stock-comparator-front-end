'use client'

import DataTable from '@/components/DataTable'
import StatsBox from '@/components/StatsBox'
import {
  COLOR_GREEN,
  COLOR_RED,
  calculateWeight,
  calculateWeightReverse,
  pickColor,
} from '@/lib/colorPicker'
import { formatNumberUSD } from '@/lib/helpers'
import { FundamentalAnalysis } from '@/lib/prisma/fundamentalAnalysis'
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

const columnHelper = createColumnHelper<FundamentalAnalysis>()

interface Props {
  data: FundamentalAnalysis[]
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
      columnHelper.accessor('dcfpotential', {
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
      columnHelper.accessor('dcfworstpotential', {
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
        size: 150,
        header: () => 'Worst Case Potential',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currentprice', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 50,
        header: () => 'Current Price',
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
      columnHelper.accessor('country', {
        cell: (info) => info.getValue(),
        header: () => 'Country',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('stockcurrency', {
        cell: (info) => info.getValue(),
        header: () => 'Stock Currency',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('reportcurrency', {
        cell: (info) => info.getValue(),
        header: () => 'Report Currency',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('lastreportdate', {
        cell: (info) => info.getValue(),
        header: () => 'Last Report Date',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currentper', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Current PER',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('meanper', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Mean PER',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currentevebitda', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 2, 15)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Current EV/EBITDA',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('meanevebitda', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 2, 15)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Mean EV/EBITDA',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currentevebit', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 3, 20)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Current EV/EBIT',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currentpricetobook', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0.5, 3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 200,
        header: () => 'Current Price/ Book Value',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('meanpricetobook', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0.5, 3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 200,
        header: () => 'Mean Price/ Book Value',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('currentpricetofreecashflowrate', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 200,
        header: () => 'Current Price / Free Cash Flow',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('meanpricetofreecashflowrate', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 200,
        header: () => 'Mean Price / Free Cash Flow',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('tendency', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Tendency',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('roe', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'ROE',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('roic', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'ROIC',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('meanroic', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Mean ROIC',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('roce', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'ROCE',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('roa', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'ROA',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('beta', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 50,
        header: () => 'Beta',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('cashtototalassets', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 150,
        header: () => 'Total Cash / Total Assets',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('cashoverstockprice', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 0.3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 100,
        header: () => 'Cash / Stock Price',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('liabilitiestoequityratio', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 100,
        header: () => 'Liabilities / Equity',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('netdebttoebitda', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 4)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 150,
        header: () => 'Net Debt / EBITDA',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('meannetdebttoebitda', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeightReverse(value, 0, 4)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100) / 100}
            </StatsBox>
          )
        },
        size: 200,
        header: () => 'Mean Net Debt / EBITDA',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('interestexpensetoebit', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 0.6)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 200,
        header: () => 'Interest Expense / EBIT',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('entreprisevalueusd', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{formatNumberUSD(value)}</StatsBox>
        },
        header: () => 'Entreprise Value in USD',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('dividendyield', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100)} %</StatsBox>
        },
        size: 100,
        header: () => 'Dividend Yield',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('ebitdamargin', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 0.5)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 100,
        header: () => 'EBITDA Margin',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('netincomemargin', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0
          const weight = calculateWeight(value, 0, 0.3)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(value * 100)} %
            </StatsBox>
          )
        },
        size: 50,
        header: () => 'Net Income Margin',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('wacc', {
        cell: ({ cell }) => {
          const value = cell.getValue() ?? 0

          return <StatsBox>{Math.round(value * 100) / 100}</StatsBox>
        },
        size: 50,
        header: () => 'WACC',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('lastupdate', {
        cell: (info) => info.getValue(),
        header: () => 'Last Update',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('firstyearreport', {
        cell: (info) => info.getValue(),
        header: () => 'First Year Report',
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
