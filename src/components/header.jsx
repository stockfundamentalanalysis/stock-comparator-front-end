import React from 'react'
import { Box, Button, styled, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import robotImage from '../images/robot.png'

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    backgroundColor: 'orange',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }))

  const BoxText = styled(Box)(({ theme }) => ({
    flex: '1',
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      flex: '2',
      textAlign: 'center',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }))

  const ImageBox = styled(Box)(({ theme }) => ({
    flex: '2',
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  }))

  return (
    <CustomBox component="header">
      {/* Box text */}
      <BoxText component="section">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Find the best stock across every sector
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: '#fff',
          }}
        >
          More than 500 stocks analyzed and updated daily. Artificial
          Intelligence analysis based on companies financial statements and
          market data.
        </Typography>

        <Box>
          <Button
            component={Link}
            href={'/select_detail'}
            variant="contained"
            sx={{
              mr: 2,
              px: 4,
              py: 1,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
              borderRadius: 0,
              borderColor: '#14192d',
              color: '#fff',
              backgroundColor: '#14192d',
              '&&:hover': {
                backgroundColor: '#343a55',
              },
              '&&:focus': {
                backgroundColor: '#343a55',
              },
            }}
          >
            Company Details
          </Button>
          <Button
            component={Link}
            href={'/table5'}
            variant="outlined"
            sx={{
              px: 4,
              py: 1,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
              borderRadius: 0,
              color: '#fff',
              backgroundColor: 'transparent',
              borderColor: '#fff',
              '&&:hover': {
                color: '#343a55',
                borderColor: '#343a55',
              },
              '&&:focus': {
                color: '#343a55',
                borderColor: '#343a55',
              },
            }}
          >
            Easy Comparator
          </Button>
        </Box>
      </BoxText>

      <ImageBox>
        <Image src={robotImage} alt="Image" width={500} height={400} />
      </ImageBox>
    </CustomBox>
  )
}

export default Header
