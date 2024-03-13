import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Box, Stack, styled, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import FooterLink from './footerlink'
import FooterTitle from './footertitle'

const Footer = () => {
  const StackColumn = styled(Stack)(() => ({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 8,
    textAlign: 'center',
  }))

  const BoxRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ededed',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 30,
    },
  }))

  return (
    <BoxRow
      component="footer"
      sx={{
        py: 4,
        px: 2,
      }}
    >
      <StackColumn>
        <FooterTitle text={'Stock Comparator'} />
        <Stack
          direction="row"
          width="70px"
          maxWidth="100%"
          justifyContent="space-between"
        >
          <Link
            href="#"
            variant="body2"
            sx={{
              color: '#414141',
              '&:hover': {
                color: '#1c2859',
              },
            }}
          >
            <InstagramIcon />
          </Link>
          <Link
            href="#"
            variant="body2"
            sx={{
              color: '#414141',
              '&:hover': {
                color: '#1c2859',
              },
            }}
          >
            <LinkedInIcon />
          </Link>
        </Stack>
        <Typography variant="caption" component="p">
          &copy; 2023 StockComparator Inc.
        </Typography>
      </StackColumn>
      <StackColumn>
        <FooterTitle text={'Contact'} />
        <FooterLink text={'+41 762369679'} />
        <FooterLink text={'info@stockcomparator.com'} />
      </StackColumn>
      <StackColumn>
        <FooterTitle text={'Headquarters'} />
        <FooterLink text={'Lausanne'} />
        <FooterLink text={'Switzerland'} />
      </StackColumn>
    </BoxRow>
  )
}

export default Footer
