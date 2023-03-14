import * as React from 'react'
import { useRouter } from 'next/router'
import Radar from '../../components/radar'
import Navbar from '@/components/navbar'
import json from '../../data/sfa_easy.json'
import { Box, Grid, Stack } from '@mui/material'

const Post = () => {
  //Get the current path in company detail page
  const router = useRouter()
  const cleanPath = router.asPath.split('#')[0].split('?')[0].split('l/')[1]
  const company_name = cleanPath.toUpperCase()
  //Filter the json data to get the company detail
  const data = Object.values(json)
  const company = data.filter((item) => item.Ticker === company_name)[0]
  ///console.log(String(company_name))
  let color = 'text.primary'
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (company.Potential > 0.1) {
    color = 'success.main'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } else if (company.Potential < -0.1) {
    color = 'error.main'
  }

  return (
    <>
      <Navbar></Navbar>
      <Grid container spacing={3}>
        <Grid item md>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <h1> Company: {company.CompanyName}</h1>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minWidth: 300,
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Potential:</Box>
              <Box
                sx={{
                  color: 'text.primary',
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
      </Grid>
    </>
  )
}

Post.getInitialProps = async () => {
  const res = await import('../../data/sfa_easy.json')
  const data = Object.values(res)
  return { props: { data } }
}

export default Post
