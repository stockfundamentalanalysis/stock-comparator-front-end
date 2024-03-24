import AdjustmentsVerticalIcon from '@/components/Icons/AdjustmentsVerticalIcon'
import Bars3Icon from '@/components/Icons/Bars3Icon'
import BoltIcon from '@/components/Icons/BoltIcon'
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon'
import EnvelopeIcon from '@/components/Icons/EnvelopeIcon'
import HomeIcon from '@/components/Icons/HomeIcon'
import InformationCircleIcon from '@/components/Icons/InformationCircleIcon'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

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
    icon: <HomeIcon className="h-6 w-auto text-gray-600" />,
    to: '/',
  },
  {
    text: 'EasyMode',
    icon: <BoltIcon className="h-6 w-auto text-gray-600" />,
    to: '/easy-table',
  },
  {
    text: 'AdvancedMode',
    icon: <AdjustmentsVerticalIcon className="h-6 w-auto text-gray-600" />,
    to: '/advanced-table',
  },
  {
    text: 'Company Details',
    icon: <InformationCircleIcon className="h-6 w-auto text-gray-600" />,
    to: '/select-detail',
  },
  {
    text: 'Contact',
    icon: <EnvelopeIcon className="h-6 w-auto text-gray-600" />,
    to: '/contact',
  },
]

const DrawerItem = () => {
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
        <Bars3Icon className="h-6 w-auto text-white" />
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
            <ChevronRightIcon className="h-6 w-auto text-gray-600" />
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
