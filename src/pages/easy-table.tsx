/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsBox from '@/components/StatsBox'
import NavBar from '@/components/navbar'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const EasyTable = () => {
  const [simpleAnalysis, setSimpleAnalysis] = useState([])

  useEffect(() => {
    async function fetchCarData() {
      try {
        const carResponse = await fetch('/api/simple-analysis')
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

  const green = useMemo(() => [0, 255, 0], [])
  const white = useMemo(() => [255, 255, 255], [])
  const red = useMemo(() => [255, 0, 0], [])

  //should be memoized or stable
  //
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'Ticker',
        accessorKey: 'ticker',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const route = '/detail/' + cell.getValue().toLowerCase()
          return <Link href={route}>{cell.getValue()}</Link>
        },
      },
      {
        header: 'CompanyName',
        accessorKey: 'companyname',
      },
      {
        header: 'Sector',
        accessorKey: 'sector',
      },
      {
        header: 'Potential',
        accessorKey: 'potential',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, -1, 1.5)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
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
        header: 'Currency',
        accessorKey: 'currency',
        size: 50,
      },
      {
        header: 'DebtQuality Score',
        accessorKey: 'debtqualityscore',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)

          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Earnings Score',
        accessorKey: 'earningsscore',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Profitability Score',
        accessorKey: 'profitabilityscore',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
      },
      {
        header: 'Growth Score',
        accessorKey: 'growthscore',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          const value = cell.getValue()
          const weight = calculateWeight(value, 0, 1)
          const rgb = pickHex(red, green, white, weight)
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
          )
        },
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

export default EasyTable
