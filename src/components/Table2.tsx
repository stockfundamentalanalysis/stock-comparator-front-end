import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useMemo } from 'react'
import json from '../data/sfa_easy.json'

function pickHex(color_bad, color_good, color_intermediate, weight) {
  if (weight > 0.5) {
    var color2 = color_intermediate
    var color1 = color_good
    var w1 = (weight - 0.5) * 2
    var w2 = 1 - w1
  } else {
    var color1 = color_intermediate
    var color2 = color_bad
    var w1 = weight * 2
    var w2 = 1 - w1
    // OK the calculation
  }
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ]
  return rgb
}

function calculateWeight(value, min, max) {
  const weight = Math.max(0, Math.min((value - min) / (max - min), 1))
  return weight
}

const green = [0, 255, 0]
const white = [255, 255, 255]
const red = [255, 0, 0]

type Company = {
  Ticker: string
  CompanyName: string
  Potential: number
  TargetPrice: number
  DebtQualityScore: number
  EarningsScore: number
  ProfitabilityScore: number
  GrowthScore: number
  Sector: string
}

const data: Company[] = Object.values(json)

const columnHelper = createColumnHelper<Company>()

const columns = [
  columnHelper.accessor((row) => row.Ticker, {
    id: 'Ticker',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Ticker</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.CompanyName, {
    id: 'CompanyName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>CompanyName</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.Potential, {
    id: 'Potential',
    cell: (info) => {
      const value = info.getValue()
      const weight = calculateWeight(value, -1, 1.5)
      const rgb = pickHex(red, green, white, weight)
      const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      return (
        <div style={{ backgroundColor: color }}>
          {Math.round(value * 100)} %
        </div>
      )
    },
    header: () => <span>Potential</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.TargetPrice, {
    id: 'TargetPrice',
    cell: (cell) => <div>{Math.round(cell.getValue() * 100) / 100} </div>,
    header: () => <span>TargetPrice</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.DebtQualityScore, {
    id: 'DebtQualityScore',
    cell: (info) => {
      const value = info.getValue()
      const weight = calculateWeight(value, 0, 1)
      const rgb = pickHex(red, green, white, weight)
      const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      return (
        <div style={{ backgroundColor: color }}>
          {Math.round(value * 100)} %
        </div>
      )
    },
    header: () => <span>DebtQualityScore</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.EarningsScore, {
    id: 'EarningsScore',
    cell: (info) => {
      const value = info.getValue()
      const weight = calculateWeight(value, 0, 1)
      const rgb = pickHex(red, green, white, weight)
      const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      return (
        <div style={{ backgroundColor: color }}>
          {Math.round(value * 100)} %
        </div>
      )
    },
    header: () => <span>EarningsScore</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.ProfitabilityScore, {
    id: 'ProfitabilityScore',
    cell: (info) => {
      const value = info.getValue()
      const weight = calculateWeight(value, 0, 1)
      const rgb = pickHex(red, green, white, weight)
      const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      return (
        <div style={{ backgroundColor: color }}>
          {Math.round(value * 100)} %
        </div>
      )
    },

    header: () => <span>ProfitabilityScore</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.GrowthScore, {
    id: 'GrowthScore',
    cell: (info) => {
      const value = info.getValue()
      const weight = calculateWeight(value, 0, 1)
      const rgb = pickHex(red, green, white, weight)
      const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      return (
        <div style={{ backgroundColor: color }}>
          {Math.round(value * 100)} %
        </div>
      )
    },
    header: () => <span>GrowthScore</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.Sector, {
    id: 'Sector',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Sector</span>,
    footer: (info) => info.column.id,
  }),
]

const Table = (): JSX.Element => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table className="border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-r border-gray-200 px-0.5 py-1"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-b border-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="text-gray-400">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="font-normal">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

export default Table
