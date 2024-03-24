import DrawerItem from '@/components/draweritem'
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'

import Link from 'next/link'
import ArrowTrendingUpIcon from './Icons/ArrowTrendingUpIcon'

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '100%', // Adjust the maximum width as needed
  paddingY: '0px',
  alignItems: 'center', // Add this line to vertically align the items
})

const ListMenu = styled(List)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}))

// rotas
const itemList = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'Easy Comparator',
    to: '/easy-table',
  },
  {
    text: 'Advanced Comparator',
    to: '/advanced-table',
  },
  {
    text: 'Company Details',
    to: '/select-detail',
  },
  {
    text: 'Contact',
    to: '/contact',
  },
]

const Navbar = () => {
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: 'rgb(0,0,0)',
        margin: 0,
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowTrendingUpIcon className="mr-1 h-6 w-auto text-white" />
          <Typography variant="h6" component="h2">
            Stock Comparator
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <DrawerItem />
        </Box>
        <ListMenu>
          {itemList.map((item) => {
            const { text } = item
            return (
              <ListItem key={text}>
                <ListItemButton
                  component={Link}
                  href={item.to}
                  sx={{
                    color: '#fff',
                    fontSize: '0.8rem',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'rgb(100,100,100)',
                    },
                  }}
                >
                  <ListItemText
                    primary={text}
                    sx={{ whiteSpace: 'nowrap' }} // Ensure text stays on a single line
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </ListMenu>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
