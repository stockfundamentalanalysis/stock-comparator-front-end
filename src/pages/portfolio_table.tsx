/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from '@/components/navbar'
import { Box, Grid } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'

const PortfolioTable = () => {
  const [portfolio, setPortfolio] = useState([])
  const [totalCurrentPortfolioValueUSD, setTotalCurrentPortfolioValueUSD] =
    useState(0)
  const [totalMarginUSD, setTotalMarginUSD] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/getPortfolio')
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data')
        }
        const data = await response.json()
        setPortfolio(data)

        // Calculate totalCurrentPortfolioValueUSD
        const totalValue = data.reduce(
          (acc: any, entry: any) => acc + entry.CurrentPortfolioValueUSD,
          0
        )
        setTotalCurrentPortfolioValueUSD(totalValue)

        const totalMargin = data.reduce(
          (acc: any, entry: any) => acc + entry.MarginUSD,
          0
        )
        setTotalMarginUSD(totalMargin)
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
      }
    }
    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      {
        header: 'Company Name',
        accessorKey: 'CompanyName',
      },
      {
        header: 'Potential',
        accessorKey: 'Potential',
        size: 50,
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
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
        header: 'Current Price',
        accessorKey: 'CurrentPrice',
        size: 30,
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
        header: 'Mean Buy Price',
        accessorKey: 'MeanBuyPrice',
        size: 30,
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
        header: 'Stocks Owned',
        accessorKey: 'StocksOwned',
        size: 20,
      },

      {
        header: 'Percentual Margin',
        accessorKey: 'PercentualMargin',
        size: 10,
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
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
        header: 'Margin USD',
        accessorKey: 'MarginUSD',
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
        header: 'Current Value USD',
        accessorKey: 'CurrentPortfolioValueUSD',
        size: 30,
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
        header: 'Proportion Of Portfolio',
        accessorKey: 'ProportionOfPortfolio',
        size: 20,
        Cell: ({ cell }: { cell: any }) => {
          return (
            <Box
              sx={{
                borderRadius: '0.25rem',
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
        header: 'Mean Sell Price',
        accessorKey: 'MeanSellPrice',
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
    ],
    []
  )

  return (
    <>
      <NavBar />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
              maxWidth: 300,
            }}
          >
            <Box sx={{ color: 'text.secondary' }}>
              Total Current Portfolio Value :
            </Box>
            <Box
              sx={{
                color: 'black',
                fontSize: 24,
                fontWeight: 'medium',
              }}
            >
              {Math.round(totalCurrentPortfolioValueUSD)} $
            </Box>
          </Box>
        </Grid>
        <Grid item md>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
              maxWidth: 300,
            }}
          >
            <Box sx={{ color: 'text.secondary' }}>Total Earnings/Losses :</Box>
            <Box
              sx={{
                color: 'black',
                fontSize: 24,
                fontWeight: 'medium',
              }}
            >
              {Math.round(totalMarginUSD)} $
            </Box>
          </Box>
        </Grid>

        <Grid item md>
          <MaterialReactTable
            columns={columns}
            data={portfolio}
            enableColumnPinning={true}
            enableStickyHeader={true}
            initialState={{
              density: 'compact',
              columnPinning: { left: ['CompanyName'] },
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PortfolioTable
