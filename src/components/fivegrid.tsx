import img1 from '@/images/prof.jpeg'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'

const ExplanationFiveGrid = () => {
  return (
    <Box sx={{ p: 6 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 5,
              minHeight: 100, // Ensure minimum height for visual coherence
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" color="black">
              Fundamental Analysis
            </Typography>
            <br />
            <Typography variant="body1" color="text.primary" align="justify">
              A in depth analysis of a company&apos;s fundamental state involves
              computing key historical financial metrics, including net income,
              Total Net Debt, Free Cash Flow, EBITDA, ROIC, Liabilities, Cash
              available, and interest expenses, among others.
            </Typography>
            <br />
            <Image
              src={img1}
              alt="Profile"
              width={100}
              height={100}
              style={{ borderRadius: '0%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 5,
              minHeight: 100, // Ensure minimum height for visual coherence
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" color="black">
              Sector Adaptation
            </Typography>
            <br />
            <Typography variant="body1" color="text.primary" align="justify">
              Companies are analyzed based on their respective sectors, with
              considerations for differing characteristics and dynamics. For
              instance, a bank cannot undergo the same analysis as a technology
              firm or a cyclical commodity producer.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 5,
              minHeight: 100, // Ensure minimum height for visual coherence
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" color="black">
              Value Investing
            </Typography>
            <br />
            <Typography variant="body1" color="text.primary" align="justify">
              Value investing entails choosing undervalued stocks trading below
              their intrinsic value or target price. As value investors, we
              purchase stocks that the market underestimates, indicating they
              are undervalued, and sell them once they approach their target
              price.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 5,
              minHeight: 100, // Ensure minimum height for visual coherence
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" color="black">
              Target Price Calculation & Potential
            </Typography>
            <br />
            <Typography align="justify">
              The stock&apos;s target price is derived from sophisticated
              discounted cash flow techniques that analyze financial reports,
              future earnings estimates, and sector dynamics. This target price
              reflects the intrinsic value of the stock. The variance between
              the target price and the current stock price signifies its
              potential for appreciation or depreciation.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 5,
              minHeight: 100, // Ensure minimum height for visual coherence
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" color="black">
              Risk Mitigation & Investing Strategy
            </Typography>
            <br />
            <Typography align="justify">
              Through rigorous mathematical analysis of company finances, only
              investing in high-appreciation potential companies, and selling
              when they hit close to their target price, investors steer clear
              of permanent losses. Like Warren Buffett says, &apos;First rule of
              investing: Don&apos;t lose money. Second rule: Don&apos;t forget
              the first one. And that&apos;s all the rules there are.&apos;
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExplanationFiveGrid
