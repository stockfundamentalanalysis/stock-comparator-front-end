import React from 'react'
import { Button, Stack, Box, styled, Typography } from '@mui/material'
import Title from './title'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'

// Import FontAwesome dependencies
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBriefcase,
  faGlobe,
  faFile,
  faBomb,
  faCalculator,
  faArrowUpRightDots,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Initialize FontAwesome library with required icons
library.add(faBriefcase, faGlobe, faFile)

const GetInTouch = () => {
  const CustomTypography = styled(Typography)({
    fontSize: '1.1rem',
    textAlign: 'start',
    lineHeight: '1.5',
    color: '#515151',
    marginTop: '1.5rem',
  })

  const theme = useTheme()

  return (
    <Stack
      component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 10,
        mx: 0,
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        backgroundColor: 'rgb(0,0,0)',
      }}
    >
      <Box maxWidth={'md'} mx={'auto'} textAlign={'center'}>
        <Box mb={4}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'rgb(255,255,255)',
              fontSize: 70,
            }}
          >
            Stock Comparator Premium
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'rgb(255,255,255)',
              fontSize: 30,
            }}
          >
            desktop version for PC and MAC
          </Typography>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={2}
        >
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
              width="100%"
              height="150px"
              bgcolor="#fff"
              borderRadius={4}
              boxShadow={1}
            >
              <FontAwesomeIcon icon={faCalculator} size="4x" />
            </Box>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              color="rgb(255,255,255)"
            >
              Target price calculation for any stock worldwide based on their
              annual reports.
            </Typography>
          </Box>

          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
              width="100%"
              height="150px"
              bgcolor="#fff"
              borderRadius={4}
              boxShadow={1}
            >
              <FontAwesomeIcon icon={faArrowUpRightDots} size="4x" />
            </Box>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              color="rgb(255,255,255)"
              //sx={{ fontStyle: 'italic' }}
            >
              Target price adaptation based on your company growth estimation.
            </Typography>
          </Box>

          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
              width="100%"
              height="150px"
              bgcolor="#fff"
              borderRadius={4}
              boxShadow={1}
            >
              <FontAwesomeIcon icon={faBomb} size="4x" />
            </Box>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              color="rgb(255,255,255)"
            >
              Target price adaptation based on factors like interest rates and
              geopolitical risks.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        component={Link}
        href={'/contact'}
        sx={{
          mr: 3,
          px: 5,
          py: 2,
          margin: 4,
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
        get in touch
      </Button>
    </Stack>
  )
}

export default GetInTouch
