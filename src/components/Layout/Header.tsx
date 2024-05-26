import Logo from '@/components/Logo'
import Link from 'next/link'
import AuthButton from './AuthButton'
import MobileMenu from './MobileMenu'

const navigation = [
  {
    name: 'Easy Comparator',
    href: '/easy-table',
  },
  {
    name: 'Advanced Comparator',
    href: '/advanced-table',
  },
  {
    name: 'Company Details',
    href: '/select-detail',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

const Header = (): JSX.Element => {
  return (
    <header className="inset-x-0 top-0 z-50 bg-black">
      <div className="flex flex-row items-center space-x-4 p-6 lg:justify-between lg:space-x-12 lg:px-8">
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo />
          </Link>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex flex-row items-center gap-x-12">
            {navigation.map((item) => (
              <li
                key={item.name}
                className="text-sm font-semibold leading-6 text-white"
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <AuthButton />
        <MobileMenu />
      </div>
    </header>
  )
}

export default Header
