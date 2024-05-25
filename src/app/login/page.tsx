import Login from '@/app/login/_components/Login'
import Logo from '@/components/Logo'
import SuspenseSkeleton from '@/components/SuspenseSkeleton'
import loginBackground from '@/images/login.jpg'
import Image from 'next/image'
import { Suspense } from 'react'

interface TextTypes {
  title: string
  bgAlt: string
  description: string
}

const TEXTS: TextTypes = {
  title: 'Sign In',
  bgAlt: 'Sign In to Stock Comparator',
  description:
    'Sign in to your account to continue. You will receive a one-time link in your email to sign in.',
}

const Divider = (): JSX.Element => (
  <div className="relative py-8">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-700" />
    </div>
  </div>
)

export default async function Page() {
  return (
    <main className="flex min-h-dvh bg-gray-900">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Logo />
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
              {TEXTS.title}
            </h2>
            <p className="mt-4 text-sm text-gray-400">{TEXTS.description}</p>
          </div>

          <Divider />

          <Suspense fallback={<SuspenseSkeleton />}>
            <Login />
          </Suspense>
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src={loginBackground}
          alt={TEXTS.bgAlt}
          className="absolute h-full w-full object-cover object-center"
        />
      </div>
    </main>
  )
}
