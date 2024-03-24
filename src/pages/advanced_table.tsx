/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from '@/components/navbar'
import { formatNumberUSD } from '@/utils/user_table_tools'
import { Box } from '@mui/material'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'

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

  const green = useMemo(() => [0, 255, 0], [])
  const white = useMemo(() => [255, 255, 255], [])
  const red = useMemo(() => [255, 0, 0], [])

  //should be memoized or stable
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
        accessorKey: 'dcfworstpotential',
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
        accessorKey: 'currentprice',
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
        accessorKey: 'targetprice',
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
        accessorKey: 'meanper',
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
        accessorKey: 'currentevebitda',
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
        accessorKey: 'meanevebitda',
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
        accessorKey: 'currentevebit',
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
        accessorKey: 'currentpricetobook',
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
        accessorKey: 'meanpricetobook',
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
        accessorKey: 'currentpricetofreecashflowrate',
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
        accessorKey: 'meanpricetofreecashflowrate',
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
        accessorKey: 'roe',
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
        accessorKey: 'roic',
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
        accessorKey: 'meanroic',
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
        accessorKey: 'roce',
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
        accessorKey: 'roa',
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
        accessorKey: 'beta',
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
        accessorKey: 'cashtototalassets',
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
        accessorKey: 'cashoverstockprice',
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
        accessorKey: 'liabilitiestoequityratio',
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
        accessorKey: 'netdebttoebitda',
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 4)
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
        accessorKey: 'meannetdebttoebitda',
        size: 200,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeightReverse(value, 0, 4)
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
        accessorKey: 'interestexpensetoebit',
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
        accessorKey: 'entreprisevalueusd',
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
        accessorKey: 'ebitdatendency',
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
        accessorKey: 'freecashflowtendency',
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
        accessorKey: 'operatingcashflowtendency',
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
        accessorKey: 'netincometendency',
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
        accessorKey: 'equitytendency',
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
        accessorKey: 'roictendency',
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
        accessorKey: 'dividendyield',
        size: 100,
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
              {Math.round(cell.getValue() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'EBITDA Margin',
        accessorKey: 'ebitdamargin',
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
        accessorKey: 'netincomemargin',
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
        accessorKey: 'wacc',
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
        header: 'PFFO',
        accessorKey: 'pffo',
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
        header: 'Mean PFFO',
        accessorKey: 'meanpffo',
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
        header: 'Last Update',
        accessorKey: 'lastupdate',
      },

      {
        header: 'First Year Report',
        accessorKey: 'firstyearreport',
      },
    ],
    [green, red, white]
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
