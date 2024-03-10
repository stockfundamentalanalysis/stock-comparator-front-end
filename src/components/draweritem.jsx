import React, { useState } from 'react'
import {
  styled,
  useTheme,
  Drawer,
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
// rotas
import Link from 'next/link'
// icons
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AutoMode from '@mui/icons-material/AutoMode'
import BuildCircle from '@mui/icons-material/BuildCircle'

const drawerWidth = 240

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 5),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))

//rotas
const itemList = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    to: '/',
  },
  {
    text: 'EasyMode',
    icon: <AutoMode />,
    to: '/easy_table',
  },
  {
    text: 'AdvancedMode',
    icon: <BuildCircle />,
    to: '/advanced_table',
  },
  {
    text: 'Company Details',
    icon: <InfoIcon />,
    to: '/select_detail',
  },
  {
    text: 'Contact',
    icon: <EmailIcon />,
    to: '/contact',
  },
]

const DrawerItem = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          flexGrow: 1,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemList.map((item) => {
            const { text } = item
            return (
              <ListItem
                key={text}
                component={Link}
                href={item.to}
                sx={{
                  color: '#414141',
                  '&:hover': {
                    backgroundColor: '#e9e5e5',
                    color: '#1c2859',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#1c2859',
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}

export default DrawerItem
