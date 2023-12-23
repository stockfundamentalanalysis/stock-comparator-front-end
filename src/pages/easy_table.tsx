import React, { useMemo, useState, useEffect } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Cell,
} from 'material-react-table'
//import json from '../data/sfa_easy.json'
import { red } from '@mui/material/colors'
import { Box } from '@mui/material'
import { palette } from '@mui/system'
import NavBar from '../components/navbar'
import Link from 'next/link'

//import '../styles/global.css'

//nested data is ok, see accessorKeys in ColumnDef below

const EasyTable = () => {
  const [simpleAnalysis, setSimpleAnalysis] = useState([])

  useEffect(() => {
    async function fetchCarData() {
      try {
        const carResponse = await fetch('/api/simpleAnalysis')
        if (!carResponse.ok) {
          throw new Error('Failed to fetch car data')
        }
        const carData = await carResponse.json()
        setSimpleAnalysis(carData)
      } catch (error) {
        console.error('Error fetching car data:', error)
      }
    }

    fetchCarData()
  }, [])

  const data = Object.values(simpleAnalysis)

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

  const green = [0, 255, 0]
  const white = [255, 255, 255]
  const red = [255, 0, 0]
  const black = [0, 0, 0]
  const grey = [128, 128, 128]

  interface Company {
    id: any
    Ticker: any
    CompanyName: any
    Sector: any
    Potential: any
    TargetPrice: any
    Currency: any
    DebtQualityScore: any
    EarningsScore: any
    GrowthScore: any
    ProfitabilityScore: any
  }

  //should be memoized or stable
  //
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'Ticker',
        accessorKey: 'Ticker',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
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

                maxWidth: '9ch',
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
        header: 'TargetPrice',
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
        header: 'Currency',
        accessorKey: 'Currency',
        size: 50,
      },
      {
        header: 'DebtQualityScore',
        accessorKey: 'DebtQualityScore',
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
                maxWidth: '9ch',
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
        header: 'EarningsScore',
        accessorKey: 'EarningsScore',
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
                maxWidth: '9ch',
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
        header: 'ProfitabilityScore',
        accessorKey: 'ProfitabilityScore',
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
                maxWidth: '9ch',
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
        header: 'GrowthScore',
        accessorKey: 'GrowthScore',
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
                maxWidth: '9ch',
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

export default EasyTable
