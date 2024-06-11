'use client'

import { logout } from '@/app/auth/actions'
import ArrowRightStartOnRectangleIcon from '@/components/Icons/ArrowRightStartOnRectangleIcon'
import ArrowTrendingUpIcon from '@/components/Icons/ArrowTrendingUpIcon'
import BriefcaseIcon from '@/components/Icons/BriefcaseIcon'
import ChartPieIcon from '@/components/Icons/ChartPieIcon'
import ChevronUpIcon from '@/components/Icons/ChevronUpIcon'
import CreditCardIcon from '@/components/Icons/CreditCardIcon'
import HomeIcon from '@/components/Icons/HomeIcon'
import LightBulbIcon from '@/components/Icons/LightBulbIcon'
import QuestionMarkCircleIcon from '@/components/Icons/QuestionMarkCircleIcon'
import ShieldCheckIcon from '@/components/Icons/ShieldCheckIcon'
import SparklesIcon from '@/components/Icons/SparklesIcon'
import UserCircleIcon from '@/components/Icons/UserCircleIcon'
import { Avatar } from '@/components/ui/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/ui/dropdown'
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/ui/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/ui/sidebar'
import { SidebarLayout } from '@/components/ui/sidebar-layout'
import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'

const SIDEBAR_TOOLS = [
  {
    id: 'easy-table',
    name: 'Easy Stock Comparator',
    url: '/easy-table',
  },
  {
    id: 'advanced-table',
    name: 'Advanced Stock Comparator',
    url: '/advanced-table',
  },
  {
    id: 'target-price-calculator',
    name: 'Target Price Calculator',
    url: '/target-price-calculator',
  },
]

function getInitialsFromEmail(email: string): string {
  const parts = email.split('@')[0].split(/[._]/)

  const firstPart = parts.at(0)?.charAt(0).toUpperCase() ?? null
  const secondPart = parts.at(1)?.charAt(0).toUpperCase() ?? null

  if (!firstPart) return 'SC'

  return [firstPart, secondPart].filter(Boolean).join('')
}

function AccountDropdownMenu({
  anchor,
}: {
  anchor: 'top start' | 'bottom end'
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon className="size-4" />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon className="size-4" />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon className="size-4" />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={async () => logout()}>
        <ArrowRightStartOnRectangleIcon className="size-4" />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const email = user.email ?? '-'
  const initials = user.email ? getInitialsFromEmail(email) : 'SC'

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar
                  slot="icon"
                  initials={initials}
                  square
                  className="bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarItem href="/">
              <span className="rounded-full bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                <ArrowTrendingUpIcon className="size-5 p-[20%]" />
              </span>
              <SidebarLabel>Stock Comparator</SidebarLabel>
            </SidebarItem>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                href="/dashboard"
                current={pathname.startsWith('/dashboard')}
              >
                <HomeIcon className="size-5" />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/companies"
                current={pathname.startsWith('/companies')}
              >
                <BriefcaseIcon className="size-5" />
                <SidebarLabel>Companies</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/portfolio"
                current={pathname.startsWith('/portfolio')}
              >
                <ChartPieIcon className="size-5" />
                <SidebarLabel>Portfolio</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/transactions"
                current={pathname.startsWith('/transactions')}
              >
                <CreditCardIcon className="size-5" />
                <SidebarLabel>Transactions</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Tools</SidebarHeading>
              {SIDEBAR_TOOLS.map((event) => (
                <SidebarItem key={event.id} href={event.url}>
                  {event.name}
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon className="size-5" />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon className="size-5" />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    slot="icon"
                    initials={initials}
                    square
                    className="size-10 bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-gray-950 dark:text-white">
                      My Account
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-gray-500 dark:text-gray-400">
                      {email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon className="size-4" />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
