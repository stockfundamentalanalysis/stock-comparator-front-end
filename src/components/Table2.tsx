import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  Column,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  FilterFns,
  PaginationState,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import json from '../data/sfa_easy.json'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

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
        <div className="h-full" style={{ backgroundColor: color }}>
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
        <div className="h-full" style={{ backgroundColor: color }}>
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

// HASTA AQUI OK

const Table = (): JSX.Element => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 500,
    pageCount: undefined, // allows the table to calculate the page count for us via instance.getPageCount()
    // If we wanted to control the pageCount, we could provide it here (eg. if we were doing server-side pagination)
  })

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableFilters: true,
    enableSorting: true,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    debugTable: true,
  })

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b bg-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : '',
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: ' 🔼',
                                  desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="border-b">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      // IF NUMERIC BACKGROUND COLOR
                      <td
                        className="h-full text-center text-sm font-light text-gray-900"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {/* <tfoot className="text-gray-400">
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
              </tfoot> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <></>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 rounded border shadow"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default Table
function rankItem(arg0: any, value: any) {
  throw new Error('Function not implemented.')
}
