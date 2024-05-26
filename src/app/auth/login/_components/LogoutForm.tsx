import { logout } from '@/app/auth/actions'
import { SubmitButton } from '@/app/auth/login/_components/SubmitButton'
import ArrowUturnLeft from '@/components/Icons/ArrowUturnLeft'
import Link from 'next/link'

interface TextTypes {
  dashboard: string
  logout: string
}

const TEXTS: TextTypes = {
  dashboard: 'Go to Dashboard',
  logout: 'Sign Out',
}

const LogoutForm = (): JSX.Element => {
  return (
    <div className="flex flex-row space-x-4">
      <div>
        <Link
          href="/dashboard"
          className="flex w-full cursor-pointer flex-row items-center rounded-md px-3 py-2 text-center text-sm font-semibold text-gray-200 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-black focus:outline-none"
        >
          <ArrowUturnLeft className="mr-2 size-4" />
          {TEXTS.dashboard}
        </Link>
      </div>
      <form className="flex-1" action={logout}>
        <SubmitButton cta={TEXTS.logout} color="red" />
      </form>
    </div>
  )
}

export default LogoutForm
