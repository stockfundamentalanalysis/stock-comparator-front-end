import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

// Import FontAwesome dependencies
import ArrowTrendingUpIcon from '@/components/Icons/ArrowTrendingUpIcon'
import BriefcaseIcon from '@/components/Icons/BriefcaseIcon'
import CalculatorIcon from '@/components/Icons/CalculatorIcon'

const GetInTouch = () => {
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
            component="h2"
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
            component="h2"
            sx={{
              fontWeight: 700,
              color: 'rgb(255,255,255)',
              fontSize: 25,
            }}
          >
            Only for registered users
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
              <BriefcaseIcon className="h-20 w-auto text-black" />
            </Box>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              color="rgb(255,255,255)"
            >
              Manage your ouwn real or demo portfolio. Get the overall vision of
              its performance.
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
              <CalculatorIcon className="h-20 w-auto text-black" />
            </Box>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              color="rgb(255,255,255)"
            >
              Request the target price and potential calculation of any stock
              worldwide.
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
              <ArrowTrendingUpIcon className="h-20 w-auto text-black" />
            </Box>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              color="rgb(255,255,255)"
              //sx={{ fontStyle: 'italic' }}
            >
              Recalculate the target price of any stock based on your own
              company growth estimation.
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
          borderRadius: 3,
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
