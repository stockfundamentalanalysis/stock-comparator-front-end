import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BasicTable from '@/components/table'
import Radar from '@/components/radar'
import Navbar from '@/components/navbar'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material'

interface CompanyData {
  CompanyName: string
  Sector: string
  TargetPrice: any
  LongDescription: any
  Potential: number
  GrowthScore: any
  DebtQualityScore: any
  EarningsScore: any
  ProfitabilityScore: number
  Currency: string
  Price: any
  CurrentPER: any
  CurrentEVEBITDA: any
  CurrentPricetoFreeCashFlowRate: any
  ROIC: any
  NetDebttoEBITDA: any

  // Add other properties as needed
}

const Post = () => {
  //Get the current path in company detail page
  const router = useRouter()
  const cleanPath = router.asPath.split('#')[0].split('?')[0].split('l/')[1]
  const company_name = cleanPath.toUpperCase()
  //Filter the json data to get the company detail
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/getSpecificCompany?ticker=${company_name}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch company data')
        }
        const companyData = await response.json()
        //const company = Object.values(dataJson)
        //const company = data.filter((item) => item.Ticker === company_name)[0]
        setCompanyData(companyData)
        // const tickers = data.map((item) => item.Ticker)
        ///console.log(String(company_name))
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setIsLoading(false) // Set loading state to false when done
      }
    }

    fetchData()
  }, [])

  const company = companyData ? companyData : null

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  return (
    <>
      <Navbar></Navbar>
      {isLoading ? (
        // Display a loading indicator while fetching data
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item md>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
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
                <Box sx={{ color: 'text.secondary' }}>Company:</Box>
                <Box
                  sx={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'medium',
                  }}
                >
                  {company.CompanyName}
                </Box>
              </Box>
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
                <Box sx={{ color: 'text.secondary' }}>Sector:</Box>
                <Box
                  sx={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'medium',
                  }}
                >
                  {company.Sector}
                </Box>
              </Box>
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
                <Box sx={{ color: 'text.secondary' }}>Target price:</Box>
                <Box
                  sx={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'medium',
                  }}
                >
                  {company.TargetPrice.toFixed(1)} {company.Currency}
                </Box>
              </Box>
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
                <Box sx={{ color: 'text.secondary' }}>Current price:</Box>
                <Box
                  sx={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'medium',
                  }}
                >
                  {company.Price.toFixed(1)} {company.Currency}
                </Box>
              </Box>
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
                <Box sx={{ color: 'text.secondary' }}>Potential:</Box>
                <Box
                  sx={{
                    color:
                      company.Potential > 0.3
                        ? 'green'
                        : company.Potential >= -0.1
                        ? 'black'
                        : 'red',
                    fontSize: 34,
                    fontWeight: 'medium',
                  }}
                >
                  {Math.round(company.Potential * 100)} %
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item md>
            <Radar company={company}></Radar>
          </Grid>
          <Grid item md>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 300,
                  maxWidth: 500,
                }}
              >
                <Box sx={{ color: 'text.primary' }}>Company Details:</Box>
                <Box
                  sx={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'light',
                  }}
                >
                  {company.LongDescription}
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 300,
                  maxWidth: 500,
                }}
              >
                <Box>
                  <BasicTable company={companyData}></BasicTable>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Post
