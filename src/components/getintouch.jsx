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
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box maxWidth={'md'} mx={'auto'} textAlign={'center'}>
        <Box mb={4}>
          <Typography variant="h2">
            Get the Premium Version of our software
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
            <Typography variant="h6" textAlign="center" gutterBottom>
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
            <Typography variant="h6" textAlign="center" gutterBottom>
              Target price adaptation based on factors like interest rates and
              geopolitical risks.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        component={Link}
        href={'/contact'}
        size="medium"
        sx={{
          fontSize: '0.9rem',
          textTransform: 'capitalize',
          py: 2,
          px: 4,
          mt: 3,
          mb: 2,
          borderRadius: 0,
          color: '#fff',
          backgroundColor: 'orange',
          '&&:hover': {
            backgroundColor: '#343a55',
          },
          '&&:focus': {
            backgroundColor: '#343a55',
          },
        }}
      >
        get in touch
      </Button>
    </Stack>
  )
}

export default GetInTouch
