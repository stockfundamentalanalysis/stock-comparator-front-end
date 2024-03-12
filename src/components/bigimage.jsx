import { Box, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'
import imgFundamentals from '../images/fundamentals.png'
import imgPotential from '../images/potential.png'

const BigImage = () => {
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
    <>
      {/* Title */}
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontWeight: 'bold' }}
        gutterBottom
        //sx={{ fontStyle: 'italic' }}
      >
        The Method
      </Typography>
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 0 }}
        sx={{
          py: 5,
          px: 2,
        }}
      >
        {/*ELEMENT RIGHT 1*/}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          container
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 'bold' }}
            gutterBottom
            //sx={{ fontStyle: 'italic' }}
          >
            What is taken into account for the analysis?
          </Typography>
          <Box
            sx={{
              width: '100%', // Box takes the full width of the grid item
              pt: '0%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgFundamentals}
              alt="Description"
              layout="center"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </Grid>

        <CustomGridItem item xs={12} sm={6} md={6} component="section">
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 'bold' }}
            gutterBottom
            //sx={{ fontStyle: 'italic' }}
          >
            How is the stock Potential calculated?
          </Typography>
          <Box
            sx={{
              width: '100%', // Box takes the full width of the grid item
              pt: '0%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgPotential}
              alt="Description"
              layout="center"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </CustomGridItem>
        {/*END OF ELEMENT RIGHT 1*/}
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontWeight: 'bold' }}
          gutterBottom
          //sx={{ fontStyle: 'italic' }}
        >
          <br></br>
        </Typography>
      </Grid>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontWeight: 'bold' }}
        gutterBottom
        //sx={{ fontStyle: 'italic' }}
      >
        <br></br>
      </Typography>
    </>
  )
}

export default BigImage
