import React, { useMemo, useState, useEffect } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_Cell,
} from 'material-react-table'
import { formatNumberUSD } from '../utils/user_table_tools'
import { red } from '@mui/material/colors'
import { Box, TableHead } from '@mui/material'
import NavBar from '../components/navbar'
//import '../styles/global.css'
import { AlignVerticalBottom } from '@mui/icons-material'

//nested data is ok, see accessorKeys in ColumnDef below

const AdvancedTable = () => {
  const [fundamentalAnalysis, setfundamentalAnalysis] = useState([])

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const companyResponse = await fetch('/api/fundamentalAnalysis')
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
  function pickHex(
    color_bad: number[],
    color_good: number[],
    color_intermediate: number[],
    weight: number
  ) {
    let color1 = color_intermediate
    let color2 = color_bad
    let w1 = weight * 2
    let w2 = 1 - w1
    if (weight > 0.5) {
      color2 = color_intermediate
      color1 = color_good
      w1 = (weight - 0.5) * 2
      w2 = 1 - w1
    }
    const rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2),
    ]
    return rgb
  }

  function calculateWeight(value: number, min: number, max: number) {
    const weight = Math.max(0, Math.min((value - min) / (max - min), 1))
    return weight
  }

  function calculateWeightReverse(value: number, min: number, max: number) {
    //The higher the better
    const weight = Math.max(0, 1 - Math.min((value - min) / (max - min), 1))
    return weight
  }

  const green = [0, 255, 0]
  const white = [255, 255, 255]
  const red = [255, 0, 0]
  const black = [0, 0, 0]
  const grey = [128, 128, 128]

  interface Company {
    id: any
    Ticker: any
    CompanyName: any
    CurrentPrice: any
    Country: any
    Sector: any
    LastReportDate: any
    StockCurrency: any
    ReportCurrency: any
    CurrentPER: any
    MeanPER: any
    CurrentPricetoBook: any
    MeanPricetoBook: any
    CurrentEVEBITDA: any
    MeanEVEBITDA: any
    CurrentEVEBIT: any
    CurrentPricetoFreeCashFlowRate: any
    MeanPricetoFreeCashFlowRate: any
    ROE: any
    ROCE: any
    ROA: any
    ROIC: any
    MeanROIC: any
    Beta: any
    WACC: any
    CashToTotalAssets: any
    CashOverStockPrice: any
    DebtQualityRatio: any
    LiabilitiestoEquityRatio: any
    NetDebttoEBITDA: any
    MeanNetDebttoEBITDA: any
    InterestExpensetoEBIT: any
    EntrepriseValueUSD: any
    DCFPotential: any
    DCFWorstPotential: any
    EBITDATendency: any
    FreeCashFlowTendency: any
    OperatingCashFlowTendency: any
    ROICTendency: any
    NetIncomeTendency: any
    EquityTendency: any
    DividendYield: any
    NetIncomeMargin: any
    EBITDAMargin: any
    TargetPrice: any
    PFFO: any
    MeanPFFO: any
    LastUpdate: any
    FirstYearReport: any
  }

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'Ticker',
        accessorKey: 'Ticker',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return <a>{cell.getValue()}</a>
        },
        /* muiTableHeadCellProps: {
          align: 'bottom',
        }, */
      },
      {
        header: 'Company Name',
        accessorKey: 'CompanyName',
      },
      {
        header: 'Sector',
        accessorKey: 'Sector',
      },
      {
        header: 'Potential',
        accessorKey: 'DCFPotential',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1.5)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                p: '0.25rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Worst Case Potential',
        accessorKey: 'DCFWorstPotential',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1.5)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                p: '0.25rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Current Price',
        accessorKey: 'CurrentPrice',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
                textAlign: 'left',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Target Price',
        accessorKey: 'TargetPrice',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
                textAlign: 'left',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },

      {
        header: 'Country',
        accessorKey: 'Country',
      },
      {
        header: 'Stock Currency',
        accessorKey: 'StockCurrency',
      },
      {
        header: 'Report Currency',
        accessorKey: 'ReportCurrency',
      },
      {
        header: 'Last Report Date',
        accessorKey: 'LastReportDate',
      },
      {
        header: 'Current PER',
        accessorKey: 'CurrentPER',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Mean PER',
        accessorKey: 'MeanPER',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Current EV/EBITDA',
        accessorKey: 'CurrentEVEBITDA',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 2, 15)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Mean EV/EBITDA',
        accessorKey: 'MeanEVEBITDA',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 2, 15)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Current EV/EBIT',
        accessorKey: 'CurrentEVEBIT',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 3, 20)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Current Price/ Book Value',
        accessorKey: 'CurrentPricetoBook',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0.5, 3)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Mean Price/ Book Value',
        accessorKey: 'MeanPricetoBook',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0.5, 3)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Current Price / Free Cash Flow',
        accessorKey: 'CurrentPricetoFreeCashFlowRate',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Mean Price / Free Cash Flow',
        accessorKey: 'MeanPricetoFreeCashFlowRate',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 5, 30)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'ROE',
        accessorKey: 'ROE',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'ROIC',
        accessorKey: 'ROIC',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Mean ROIC',
        accessorKey: 'MeanROIC',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'ROCE',
        accessorKey: 'ROCE',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'ROA',
        accessorKey: 'ROA',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.2)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },

      {
        header: 'Beta',
        accessorKey: 'Beta',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Total Cash / Total Assets',
        accessorKey: 'CashToTotalAssets',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.3)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Cash / Stock Price',
        accessorKey: 'CashOverStockPrice',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 0.3)
          const rgb = pickHex(green, red, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Liabilities / Equity',
        accessorKey: 'LiabilitiestoEquityRatio',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Net Debt / EBITDA',
        accessorKey: 'NetDebttoEBITDA',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 4)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Mean Net Debt / EBITDA',
        accessorKey: 'MeanNetDebttoEBITDA',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 4)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Interest Expense / EBIT',
        accessorKey: 'InterestExpensetoEBIT',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.6)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Entreprise Value in USD',
        accessorKey: 'EntrepriseValueUSD',
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {formatNumberUSD(cell.getValue())}
            </Box>
          )
        },
      },
      {
        header: 'EBITDA Tendency',
        accessorKey: 'EBITDATendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Free Cash Flow Tendency',
        accessorKey: 'FreeCashFlowTendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',
                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Operating Cash Flow Tendency',
        accessorKey: 'OperatingCashFlowTendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',
                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Net Income Tendency',
        accessorKey: 'NetIncomeTendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',
                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Equity Tendency',
        accessorKey: 'EquityTendency',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',
                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'ROIC Tendency',
        accessorKey: 'ROICTendency',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                alignContent: 'center',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Dividend Yield',
        accessorKey: 'DividendYield',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'EBITDA Margin',
        accessorKey: 'EBITDAMargin',
        size: 100,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.5)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'Net Income Margin',
        accessorKey: 'NetIncomeMargin',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 0.3)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'WACC',
        accessorKey: 'WACC',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'PFFO',
        accessorKey: 'PFFO',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Mean PFFO',
        accessorKey: 'MeanPFFO',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: 'rgba(0, 0, 0, 0.87)',

                p: '0.25rem',
                textAlign: 'center',
                fontWeight: 'light',
              }}
            >
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'Last Update',
        accessorKey: 'LastUpdate',
      },

      {
        header: 'First Year Report',
        accessorKey: 'FirstYearReport',
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
        initialState={{ density: 'compact' }}
      />
    </>
  )
}

export default AdvancedTable
