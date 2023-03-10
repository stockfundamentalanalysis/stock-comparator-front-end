import React, { useMemo } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Cell,
} from 'material-react-table'
import json from '../data/sfa_advanced.json'
import { red } from '@mui/material/colors'
import { Box, TableHead } from '@mui/material'
import { palette } from '@mui/system'
import NavBar from '../components/navbar'
//import '../styles/global.css'
import { AlignVerticalBottom } from '@mui/icons-material'

//nested data is ok, see accessorKeys in ColumnDef below
const data = Object.values(json)

const Example = () => {
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
  const black = [0, 0, 0]
  const grey = [128, 128, 128]

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        header: 'Ticker',
        accessorKey: 'Ticker',
        size: 50,
        Cell: ({ cell }) => {
          return <a>{cell.getValue()}</a>
        },
        /* muiTableHeadCellProps: {
          align: 'bottom',
        }, */
      },
      {
        header: 'CompanyName',
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
        Cell: ({ cell }) => {
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
                color: white,
              }}
            >
              {Math.round(cell.getValue<number>() * 100)} %
            </Box>
          )
        },
        // muiTableBodyCellProps: ({ cell }) => ({
        //   styleOverrides: {
        //     backgroundColor: "red",
        //   }
        // sx: {
        //   backgroundColor:
        //     cell.getValue<number>() > 0.5
        //       ? 'rgba(22, 184, 44, 0.5)'
        //       : 'rgba(255, 0, 0, 0.5)',
        //   fontWeight:
        //     cell.column.id === 'age' && cell.getValue<number>() > 40
        //       ? '700'
        //       : '400'
        // },
        // }),
      },
      {
        header: 'DCFWorstPotential',
        accessorKey: 'DCFWorstPotential',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'CurrentPrice',
        accessorKey: 'CurrentPrice',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'StockCurrency',
        accessorKey: 'StockCurrency',
      },
      {
        header: 'ReportCurrency',
        accessorKey: 'ReportCurrency',
      },
      {
        header: 'LastReportDate',
        accessorKey: 'LastReportDate',
      },
      {
        header: 'CurrentPER',
        accessorKey: 'CurrentPER',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'MeanPER',
        accessorKey: 'MeanPER',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'CurrentEVEBITDA',
        accessorKey: 'CurrentEVEBITDA',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'MeanEVEBITDA',
        accessorKey: 'MeanEVEBITDA',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'CurrentEVEBIT',
        accessorKey: 'CurrentEVEBIT',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'CurrentPricetoBook',
        accessorKey: 'CurrentPricetoBook',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'MeanPricetoBook',
        accessorKey: 'MeanPricetoBook',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'CurrentPricetoFreeCashFlowRate',
        accessorKey: 'CurrentPricetoFreeCashFlowRate',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'MeanPricetoFreeCashFlowRate',
        accessorKey: 'MeanPricetoFreeCashFlowRate',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'ROIC',
        accessorKey: 'ROIC',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'MeanROIC',
        accessorKey: 'MeanROIC',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'ROCE',
        accessorKey: 'ROCE',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'ROA',
        accessorKey: 'ROA',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'Beta',
        accessorKey: 'Beta',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'CashToTotalAssets',
        accessorKey: 'CashToTotalAssets',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'CashOverStockPrice',
        accessorKey: 'CashOverStockPrice',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
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
        header: 'LiabilitiestoEquityRatio',
        accessorKey: 'LiabilitiestoEquityRatio',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'NetDebttoEBITDA',
        accessorKey: 'NetDebttoEBITDA',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'MeanNetDebttoEBITDA',
        accessorKey: 'MeanNetDebttoEBITDA',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'InterestExpensetoEBIT',
        accessorKey: 'InterestExpensetoEBIT',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'EnterpriseValueUSD',
        accessorKey: 'EnterpriseValueUSD',
      },
      {
        header: 'EBITDATendency',
        accessorKey: 'EBITDA Tendency',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'FreeCashFlowTendency',
        accessorKey: 'FreeCashFlowTendency',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'OperatingCashFlowTendency',
        accessorKey: 'OperatingCashFlowTendency',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'NetIncomeTendency',
        accessorKey: 'NetIncomeTendency',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'EquityTendency',
        accessorKey: 'EquityTendency',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'ROICTendency',
        accessorKey: 'ROICTendency',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue() * 100) / 100}{' '}
            </Box>
          )
        },
      },
      {
        header: 'DividendYield',
        accessorKey: 'DividendYield',
        size: 50,
        Cell: ({ cell }) => {
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
              {Math.round(cell.getValue<number>() * 100)} %
            </Box>
          )
        },
      },
      {
        header: 'EBITDAMargin',
        accessorKey: 'EBITDAMargin',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'NetIncomeMargin',
        accessorKey: 'NetIncomeMargin',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'WACC',
        accessorKey: 'WACC',
        size: 50,
        Cell: ({ cell }) => {
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
        Cell: ({ cell }) => {
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
        header: 'MeanPFFO',
        accessorKey: 'MeanPFFO',
        size: 50,
        Cell: ({ cell }) => {
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
        header: 'LastUpdate',
        accessorKey: 'LastUpdate',
      },

      {
        header: 'FirstYearReport',
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
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          allignItems: 'end',
        }}
      />
    </>
  )
}

export default Example
