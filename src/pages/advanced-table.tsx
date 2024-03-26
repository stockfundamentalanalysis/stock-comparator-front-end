/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsBox from '@/components/StatsBox'
import NavBar from '@/components/navbar'
import {
  COLOR_GREEN,
  COLOR_RED,
  calculateWeight,
  calculateWeightReverse,
  pickColor,
} from '@/lib/colorPicker'
import { formatNumberUSD } from '@/lib/helpers'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'

const AdvancedTable = () => {
  const [fundamentalAnalysis, setfundamentalAnalysis] = useState([])

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const companyResponse = await fetch('/api/fundamental-analysis')
        if (!companyResponse.ok) {
          throw new Error('Failed to fetch company data')
        }
        const companyData = await companyResponse.json()
        setfundamentalAnalysis(companyData)
      } catch (error) {
        console.error('Error fetching company data:', error)
      }
    }

    fetchCompanyData()
  }, [])

  const data = Object.values(fundamentalAnalysis)

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'Ticker',
        accessorKey: 'ticker',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <a>{cell.getValue()}</a>
        },
      },
      {
        header: 'Company Name',
        accessorKey: 'companyname',
      },
      {
        header: 'Sector',
        accessorKey: 'sector',
      },
      {
        header: 'Potential',
        accessorKey: 'dcfpotential',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1.5)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Worst Case Potential',
        accessorKey: 'dcfworstpotential',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1.5)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Current Price',
        accessorKey: 'currentprice',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Target Price',
        accessorKey: 'targetprice',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },

      {
        header: 'Country',
        accessorKey: 'country',
      },
      {
        header: 'Stock Currency',
        accessorKey: 'stockcurrency',
      },
      {
        header: 'Report Currency',
        accessorKey: 'reportcurrency',
      },
      {
        header: 'Last Report Date',
        accessorKey: 'lastreportdate',
      },
      {
        header: 'Current PER',
        accessorKey: 'currentper',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Mean PER',
        accessorKey: 'meanper',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Current EV/EBITDA',
        accessorKey: 'currentevebitda',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 2, 15)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Mean EV/EBITDA',
        accessorKey: 'meanevebitda',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 2, 15)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Current EV/EBIT',
        accessorKey: 'currentevebit',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 3, 20)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Current Price/ Book Value',
        accessorKey: 'currentpricetobook',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0.5, 3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Mean Price/ Book Value',
        accessorKey: 'meanpricetobook',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0.5, 3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Current Price / Free Cash Flow',
        accessorKey: 'currentpricetofreecashflowrate',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Mean Price / Free Cash Flow',
        accessorKey: 'meanpricetofreecashflowrate',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'ROE',
        accessorKey: 'roe',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'ROIC',
        accessorKey: 'roic',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Mean ROIC',
        accessorKey: 'meanroic',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'ROCE',
        accessorKey: 'roce',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'ROA',
        accessorKey: 'roa',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },

      {
        header: 'Beta',
        accessorKey: 'beta',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Total Cash / Total Assets',
        accessorKey: 'cashtototalassets',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Cash / Stock Price',
        accessorKey: 'cashoverstockprice',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.3)
          const color = pickColor(weight, COLOR_GREEN, COLOR_RED)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Liabilities / Equity',
        accessorKey: 'liabilitiestoequityratio',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Net Debt / EBITDA',
        accessorKey: 'netdebttoebitda',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 4)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Mean Net Debt / EBITDA',
        accessorKey: 'meannetdebttoebitda',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 4)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </StatsBox>
          )
        },
      },
      {
        header: 'Interest Expense / EBIT',
        accessorKey: 'interestexpensetoebit',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.6)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Entreprise Value in USD',
        accessorKey: 'entreprisevalueusd',
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{formatNumberUSD(cell.getValue())}</StatsBox>
        },
      },
      {
        header: 'EBITDA Tendency',
        accessorKey: 'ebitdatendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Free Cash Flow Tendency',
        accessorKey: 'freecashflowtendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Operating Cash Flow Tendency',
        accessorKey: 'operatingcashflowtendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Net Income Tendency',
        accessorKey: 'netincometendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Equity Tendency',
        accessorKey: 'equitytendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'ROIC Tendency',
        accessorKey: 'roictendency',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Dividend Yield',
        accessorKey: 'dividendyield',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100)} %</StatsBox>
        },
      },
      {
        header: 'EBITDA Margin',
        accessorKey: 'ebitdamargin',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.5)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Net Income Margin',
        accessorKey: 'netincomemargin',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.3)
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'WACC',
        accessorKey: 'wacc',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'PFFO',
        accessorKey: 'pffo',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Mean PFFO',
        accessorKey: 'meanpffo',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <StatsBox>{Math.round(cell.getValue() * 100) / 100} </StatsBox>
        },
      },
      {
        header: 'Last Update',
        accessorKey: 'lastupdate',
      },

      {
        header: 'First Year Report',
        accessorKey: 'firstyearreport',
      },
    ],
    []
  )

  return (
    <>
      <NavBar />
      <MaterialReactTable
        columns={columns}
        data={data}
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

export default AdvancedTable
