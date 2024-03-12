import { Box, Button, styled, Typography } from '@mui/material'
import Link from 'next/link'

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    //backgroundImage: `url(${backgroundImage.src})`
    backgroundColor: 'rgb(0,0,0)',
    //backgroundSize: 'cover',
    backgroundPosition: 'center',
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
          component="h2"
          sx={{
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Stock Comparator
        </Typography>
        <br></br>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Unlock the best stock opportunities across every sector<br></br> with
          our comprehensive analysis.
        </Typography>

        <Typography
          variant="p"
          allign="justify"
          component="p"
          maxWidth={700}
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: '#fff',
            fontWeight: 600,
          }}
        >
          Explore over 2000 stocks analyzed and updated daily, employing
          advanced fundamental analysis techniques. Discover the potential for
          appreciation or depreciation in each stock, meticulously evaluated
          based on its financial reports, sector performance, growth outlook,
          and macroeconomic trends. Make informed investment decisions with
          comprehensive insights at your fingertips.
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
              borderRadius: 3,
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </BoxText>
    </CustomBox>
  )
}

export default Header
