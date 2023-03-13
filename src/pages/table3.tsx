import React, { useMemo } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Cell,
} from 'material-react-table'
import json from '../data/sfa_easy.json'
import { red } from '@mui/material/colors'
import { Box } from '@mui/material'
import { palette } from '@mui/system'
import NavBar from '../components/navbar'
import Link from 'next/link'
//import '../styles/global.css'

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
          const route = '/detail/' + cell.getValue().toLowerCase()
          return <Link href={route}>{cell.getValue()}</Link>
        },
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
        accessorKey: 'Potential',
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

                maxWidth: '9ch',
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
        header: 'TargetPrice',
        accessorKey: 'TargetPrice',
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
        header: 'DebtQualityScore',
        accessorKey: 'DebtQualityScore',
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
                maxWidth: '9ch',
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
        header: 'EarningsScore',
        accessorKey: 'EarningsScore',
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
                maxWidth: '9ch',
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
        header: 'ProfitabilityScore',
        accessorKey: 'ProfitabilityScore',
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
                maxWidth: '9ch',
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
        header: 'GrowthScore',
        accessorKey: 'GrowthScore',
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
                maxWidth: '9ch',
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

export default Example
