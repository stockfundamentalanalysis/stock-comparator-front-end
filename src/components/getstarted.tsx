import imgGrowth from '@/images/growth.jpeg'
import imgDetail from '@/images/prof.jpeg'
import imgProtect from '@/images/protect.jpeg'
import imgSearch from '@/images/search.jpeg'
import imgSector from '@/images/sector.jpeg'
import { Box, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'

const GetStarted = () => {
  const CustomGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })

  return (
    <>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontWeight: 'bold' }}
        gutterBottom
        //sx={{ fontStyle: 'italic' }}
      >
        <br></br>
      </Typography>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontWeight: 'bold' }}
        gutterBottom
        //sx={{ fontStyle: 'italic' }}
      >
        The Approach
      </Typography>
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 0 }}
        sx={{
          py: 8,
          px: 2,
        }}
      >
        {/*ELEMENT RIGHT 3*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box></Box>
        </CustomGridItem>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          container
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          <Box
            sx={{
              width: '80%', // Box takes the full width of the grid item
              pt: '80%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgSearch}
              alt="Description"
              layout="fill"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </Grid>
        <CustomGridItem item xs={12} sm={8} md={4}>
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
              Value Investing
            </Typography>
            <Typography
              variant="h6"
              textAlign="start"
              sx={{ fontWeight: 'light' }}
            >
              Value investing entails choosing undervalued stocks trading below
              their intrinsic value or target price. As value investors, we
              purchase stocks that the market underestimates, indicating they
              are undervalued, and sell them once they approach their target
              price.
            </Typography>
          </Box>
        </CustomGridItem>
        {/*END OF ELEMENT RIGHT 3*/}

        {/*BLANK ESPACE*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        {/*END OF BLANK ESPACE*/}

        {/*ELEMENT LEFT 2*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
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
              textAlign="right"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
              //sx={{ fontStyle: 'italic' }}
            >
              Sector Adaptation
            </Typography>
            <Typography
              variant="h6"
              textAlign="right"
              sx={{ fontWeight: 'light' }}
            >
              Companies are analyzed based on their respective sectors, with
              considerations for differing characteristics and dynamics. For
              instance, a bank cannot undergo the same analysis as a technology
              firm or a cyclical commodity producer.
            </Typography>
          </Box>
        </CustomGridItem>

        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          container
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          <Box
            sx={{
              width: '80%', // Box takes the full width of the grid item
              pt: '80%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgSector}
              alt="Description"
              layout="fill"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </Grid>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box></Box>
        </CustomGridItem>
        {/*END OF END OF ELEMENT LEFT 2*/}

        {/*BLANK ESPACE*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        {/*END OF BLANK ESPACE*/}

        {/*ELEMENT RIGHT 1*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box></Box>
        </CustomGridItem>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          container
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          <Box
            sx={{
              width: '80%', // Box takes the full width of the grid item
              pt: '80%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgDetail}
              alt="Description"
              layout="fill"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </Grid>
        <CustomGridItem item xs={12} sm={8} md={4}>
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
              Fundamental Analysis
            </Typography>
            <Typography
              variant="h6"
              textAlign="start"
              sx={{ fontWeight: 'light' }}
            >
              A in depth analysis of a company&apos;s fundamental state involves
              computing key historical financial metrics, including net income,
              Total Net Debt, Free Cash Flow, EBITDA, ROIC, Liabilities, Cash
              available, and interest expenses, among others.
            </Typography>
          </Box>
        </CustomGridItem>
        {/*END OF ELEMENT RIGHT 1*/}
        {/*BLANK ESPACE*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        {/*END OF BLANK ESPACE*/}
        {/*ELEMENT LEFT 4*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
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
              textAlign="right"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
              //sx={{ fontStyle: 'italic' }}
            >
              Target Price & Potential
            </Typography>
            <Typography
              variant="h6"
              textAlign="right"
              sx={{ fontWeight: 'light' }}
            >
              The stock&apos;s target price is calculated from sophisticated
              discounted cash flow techniques that analyze financial reports,
              future earnings estimates, and sector metrics. This target price
              reflects the intrinsic value of the stock. The ratio between the
              target price and the current stock price is the potential for
              appreciation or depreciation.
            </Typography>
          </Box>
        </CustomGridItem>

        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          container
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          <Box
            sx={{
              width: '100%', // Box takes the full width of the grid item
              pt: '100%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgGrowth}
              alt="Description"
              layout="fill"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </Grid>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box></Box>
        </CustomGridItem>
        {/*END OF END OF ELEMENT LEFT 4*/}

        {/*BLANK ESPACE*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box>
            <br></br>
          </Box>
        </CustomGridItem>
        {/*END OF BLANK ESPACE*/}
        {/*ELEMENT RIGHT 5*/}
        <CustomGridItem item xs={12} sm={8} md={4}>
          <Box></Box>
        </CustomGridItem>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          container
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          <Box
            sx={{
              width: '100%', // Box takes the full width of the grid item
              pt: '100%', // Creates a box with an aspect ratio of 1:1, adjust the percentage as needed
              position: 'relative', // Needed for Next.js Image with layout="fill"
              borderRadius: '50%', // Adjust for desired border radius
              overflow: 'hidden', // Ensures the borderRadius is applied to the image
            }}
          >
            <Image
              src={imgProtect}
              alt="Description"
              layout="fill"
              objectFit="cover" // Ensures the image covers the box area, adjust as needed
            />
          </Box>
        </Grid>
        <CustomGridItem item xs={12} sm={8} md={4}>
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
              Risk Mitigation & Investing Strategy
            </Typography>
            <Typography
              variant="h6"
              textAlign="start"
              sx={{ fontWeight: 'light' }}
            >
              Through rigorous mathematical analysis of company finances, only
              investing in high-appreciation potential companies, and selling
              when they hit close to their target price, investors steer clear
              of permanent losses. Like Warren Buffett says, &apos;First rule of
              investing: Don&apos;t lose money. Second rule: Don&apos;t forget
              the first one.&apos;
            </Typography>
          </Box>
        </CustomGridItem>
        {/*END OF ELEMENT RIGHT*/}
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

export default GetStarted
