import React from 'react'
import ReactDOM from 'react-dom/client'

//import './index.css'

import {
  createColumnHelper,
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
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
  flexRender,
  FilterFns,
} from '@tanstack/react-table'

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

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

function App() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')

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

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
    pageCount: undefined, // allows the table to calculate the page count for us via instance.getPageCount()
    // If we wanted to control the pageCount, we could provide it here (eg. if we were doing server-side pagination)
  })

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

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  return (
    <div className="p-2">
      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg border-block border p-2 shadow"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
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
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
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
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 rounded border shadow"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 rounded border shadow"
        />
      </div>
      <div className="h-1" />
    </div>
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

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
