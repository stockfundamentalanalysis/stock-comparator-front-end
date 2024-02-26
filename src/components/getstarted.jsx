import React from 'react'
import { Box, Grid, styled, Typography } from '@mui/material'
import Title from './title'
import imgDetail from '../images/growth_arrow.jpg'
import imgDetail2 from '../images/growth_stack.jpg'
import Image from 'next/image'

const GetStarted = () => {
  const CustomGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })

  const CustomTypography = styled(Typography)({
    fontSize: '1.1rem',
    textAlign: 'start',
    lineHeight: '1.5',
    color: '#515151',
    marginTop: '1.5rem',
  })

  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <CustomGridItem item xs={12} sm={8} md={6} component="section">
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          {/* <Title
            text={'Obtain the target price of any stock'}
            textAlign={'start'}
          /> */}
          <Typography
            variant="h4"
            textAlign="start"
            sx={{ fontWeight: 'bold' }}
            gutterBottom
            //sx={{ fontStyle: 'italic' }}
          >
            Obtain the target price of any stock
          </Typography>
          <Typography
            variant="h6"
            textAlign="start"
            sx={{ fontWeight: 'light' }}
          >
            Target prices are calculated based on companies
            <br />
            annual reports using fundamental analysis
            <br />
            and artificial intelligence.
            <br />
          </Typography>
        </Box>
      </CustomGridItem>

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        container
        justifyContent="center" // Center the content horizontally
        alignItems="center" // Center the content vertically
      >
        <Image
          src={imgDetail}
          alt=""
          layout="responsive"
          width={400}
          height={300}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 },
        }}
        container
        justifyContent="center" // Center the content horizontally
        alignItems="center" // Center the content vertically
      >
        <Image
          src={imgDetail2}
          alt=""
          layout="responsive"
          width={400}
          height={300}
        />
      </Grid>

      <CustomGridItem
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 },
        }}
      >
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Typography
            variant="h4"
            textAlign="start"
            sx={{ fontWeight: 'bold' }}
            gutterBottom
            //sx={{ fontStyle: 'italic' }}
          >
            Limit the risk of your investments
          </Typography>

          <Typography
            variant="h6"
            textAlign="start"
            sx={{ fontWeight: 'light' }}
          >
            The potential earnings or losses of a stock <br />
            are updated every day based on stock price <br />
            and company financial report updates. <br />
          </Typography>
        </Box>
      </CustomGridItem>
    </Grid>
  )
}

export default GetStarted
