import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  ListItemText,
} from '@mui/material'
// menu
import DrawerItem from './draweritem'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import Link from 'next/link'

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
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
    text: 'CompanyDetails',
    to: '/select_detail',
  },
  {
    text: 'EasyMode',
    to: '/table3',
  },
  {
    text: 'AdvancedMode',
    to: '/table5',
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
        backgroundColor: 'orange',
        margin: 0,
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TrendingUpIcon sx={{ marginRight: '5px' }} />
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
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#1e2a5a',
                    },
                  }}
                >
                  <ListItemText primary={text} />
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
