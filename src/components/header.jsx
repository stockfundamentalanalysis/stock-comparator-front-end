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
    backgroundColor: 'rgb(0,0,0)',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }))

  const BoxText = styled(Box)(({ theme }) => ({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align buttons to the left
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      flex: '2',
      textAlign: 'center',
      alignItems: 'center', // Align buttons to the center on smaller screens
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }))

  const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2), // Add margin between the text and buttons
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

        <ButtonContainer>
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
              backgroundColor: 'rgb(130,130,130)',
              whiteSpace: 'nowrap', // Ensure text stays on a single line
              '&&:hover': {
                backgroundColor: 'rgb(166,166,166)',
              },
              '&&:focus': {
                backgroundColor: 'rgb(130,130,130)',
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
              whiteSpace: 'nowrap', // Ensure text stays on a single line
              '&&:hover': {
                color: 'rgb(130,130,130)',
                borderColor: 'rgb(130,130,130)',
              },
              '&&:focus': {
                color: 'rgb(130,130,130)',
                borderColor: 'rgb(130,130,130)',
              },
            }}
          >
            Easy Comparator
          </Button>
        </ButtonContainer>
      </BoxText>

      <ImageBox>
        <Image src={robotImage} alt="Image" width={500} height={400} />
      </ImageBox>
    </CustomBox>
  )
}

export default Header
