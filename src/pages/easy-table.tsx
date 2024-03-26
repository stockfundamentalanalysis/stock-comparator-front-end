/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsBox from '@/components/StatsBox'
import NavBar from '@/components/navbar'
import { calculateWeight, pickColor } from '@/lib/colorPicker'
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
          const color = pickColor(weight)

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
          const color = pickColor(weight)

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
          const color = pickColor(weight)

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
          const color = pickColor(weight)

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
          const color = pickColor(weight)

          return (
            <StatsBox backgroundColor={color}>
              {Math.round(cell.getValue() * 100)} %
            </StatsBox>
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
