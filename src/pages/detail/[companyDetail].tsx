import Navbar from '@/components/navbar'
import Radar from '@/components/radar'
import BasicTable from '@/components/table'
import { Box, CircularProgress, Grid, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface CompanyData {
  companyname: string
  sector: string
  targetprice: number
  longdescription: string
  potential: number
  growthscore: number
  debtqualityscore: number
  earningsscore: number
  profitabilityscore: number
  currency: string
  price: number
  currentper: number
  currentevebitda: number
  currentpricetofreecashflowrate: number
  roic: number
  netdebttoebitda: number
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
  }, [company_name])

  const company = companyData ? companyData : null

  if (!company || !companyData) {
    return (
      <>
        <Navbar></Navbar>
        <h1>Company not found</h1>
      </>
    )
  }

  return (
    <>
      <Navbar></Navbar>
      {isLoading ? (
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
                  {company.companyname}
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
                  {company.sector}
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
                  {company.targetprice?.toFixed(1)} {company.currency}
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
                  {company.price?.toFixed(1)} {company.currency}
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
                      company.potential > 0.3
                        ? 'green'
                        : company.potential >= -0.1
                          ? 'black'
                          : 'red',
                    fontSize: 34,
                    fontWeight: 'medium',
                  }}
                >
                  {Math.round(company.potential * 100)} %
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item md>
            <Radar company={company} />
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
                  {company.longdescription}
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
