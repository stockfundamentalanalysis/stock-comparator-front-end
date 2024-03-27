'use client'

import AdjustmentsVerticalIcon from '@/components/Icons/AdjustmentsVerticalIcon'
import Bars3Icon from '@/components/Icons/Bars3Icon'
import BoltIcon from '@/components/Icons/BoltIcon'
import EnvelopeIcon from '@/components/Icons/EnvelopeIcon'
import InformationCircleIcon from '@/components/Icons/InformationCircleIcon'
import XMarkIcon from '@/components/Icons/XMarkIcon'
import Logo from '@/components/Logo'
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  {
    name: 'Easy Comparator',
    href: '/easy-table',
    icon: <BoltIcon className="h-6 w-auto text-gray-600" />,
  },
  {
    name: 'Advanced Comparator',
    href: '/advanced-table',
    icon: <AdjustmentsVerticalIcon className="h-6 w-auto text-gray-600" />,
  },
  {
    name: 'Company Details',
    href: '/select-detail',
    icon: <InformationCircleIcon className="h-6 w-auto text-gray-600" />,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: <EnvelopeIcon className="h-6 w-auto text-gray-600" />,
  },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-black">
      <header className="inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Logo />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Logo />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 flex flex-row items-center gap-x-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}

export default Navbar
