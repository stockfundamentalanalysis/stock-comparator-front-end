import ArrowDownCircleIcon from '@/components/Icons/ArrowDownCircleIcon'
import ArrowUpCircleIcon from '@/components/Icons/ArrowUpCircleIcon'
import ChevronDoubleLeftIcon from '@/components/Icons/ChevronDoubleLeftIcon'
import ChevronDoubleRightIcon from '@/components/Icons/ChevronDoubleRightIcon'
import ChevronLeftIcon from '@/components/Icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon'
import { Column, Table, flexRender } from '@tanstack/react-table'

interface SimpleAnalysis {
  ticker: string | null
  companyname: string | null
  potential: number | null
  targetprice: number | null
  currency: string | null
  debtqualityscore: number | null
  earningsscore: number | null
  profitabilityscore: number | null
  growthscore: number | null
  sector: string | null
  id: number
}

interface TextTypes {
  results: string
  page: string
  of: string
  min: string
  max: string
  search: string
}

const TEXTS: TextTypes = {
  results: 'results of',
  page: 'Page',
  of: 'of',
  min: 'Min',
  max: 'Max',
  search: 'Search',
}

interface Props {
  table: Table<SimpleAnalysis>
}

const DataTable = ({ table }: Props): JSX.Element => {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="scrollbar-hide flow-root flex-1 overflow-y-auto">
          <div className="scrollbar-hide overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="min-w-full divide-y border-b">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="divide-x bg-gray-50">
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-semibold"
                          >
                            {header.isPlaceholder ? null : (
                              <div>
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? 'flex cursor-pointer select-none flex-row items-center'
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
                                    asc: (
                                      <ArrowUpCircleIcon className="ml-2 h-4 w-4 text-black" />
                                    ),
                                    desc: (
                                      <ArrowDownCircleIcon className="ml-2 h-4 w-4 text-black" />
                                    ),
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
                              </div>
                            )}
                          </th>
                        )
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y">
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id} className="divide-x">
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className="w-full max-w-sm truncate whitespace-nowrap p-4 text-sm"
                            >
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
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 z-30 border-t bg-gray-50 p-4">
          <div className="flex shrink-0 flex-row items-center justify-between space-x-6">
            <p className="text-xs">
              {[
                table.getRowModel().rows.length,
                TEXTS.results,
                table.getFilteredRowModel().rows.length,
              ].join(' ')}
            </p>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  className="block rounded-md border bg-white p-2 placeholder:text-gray-600 focus:border-black focus:ring-black"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronDoubleLeftIcon className="h-4 w-4" />
                </button>
                <button
                  className="block rounded-md border bg-white p-2 placeholder:text-gray-600 focus:border-black focus:ring-black"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                  className="block rounded-md border bg-white p-2 placeholder:text-gray-600 focus:border-black focus:ring-black"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
                <button
                  className="block rounded-md border bg-white p-2 placeholder:text-gray-600 focus:border-black focus:ring-black"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronDoubleRightIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-2">
                <span className="text-xs">{TEXTS.page}</span>
                <input
                  type="number"
                  min={1}
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                  }}
                  className="number-without-arrows block w-12 rounded-md border border-gray-200 bg-white text-xs placeholder:text-gray-600 focus:border-black focus:ring-black"
                />
                <span className="text-xs">
                  {[TEXTS.of, table.getPageCount()].join(' ')}
                </span>
              </div>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="block w-auto rounded-md border border-gray-200 bg-white text-xs placeholder:text-gray-600 focus:border-black focus:ring-black"
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Filter = ({
  column,
  table,
}: {
  column: Column<SimpleAnalysis, unknown>
  table: Table<SimpleAnalysis>
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="mt-2 flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={TEXTS.min}
        className="block w-24 rounded-md border border-gray-200 bg-white text-xs placeholder:text-gray-600 focus:border-black focus:ring-black"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={TEXTS.max}
        className="block w-24 rounded-md border border-gray-200 bg-white text-xs placeholder:text-gray-600 focus:border-black focus:ring-black"
      />
    </div>
  ) : (
    <div className="mt-2">
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={TEXTS.search}
        className="block w-full min-w-24 rounded-md border border-gray-200 bg-white text-xs placeholder:text-gray-600 focus:border-black focus:ring-black"
      />
    </div>
  )
}

export default DataTable
