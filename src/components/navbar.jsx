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
import DrawerItem from './draweritem'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import Link from 'next/link'

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
    text: 'Company Details',
    to: '/select_detail',
  },
  {
    text: 'Easy Comparator',
    to: '/easy_table',
  },
  {
    text: 'Advanced Comparator',
    to: '/advanced_table',
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
                    fontSize: '0.5rem',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'rgb(100,100,100)',
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
