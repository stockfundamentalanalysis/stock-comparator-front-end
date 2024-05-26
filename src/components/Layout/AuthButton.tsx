import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface TextTypes {
  signIn: string
  dashboard: string
}

const TEXTS: TextTypes = {
  signIn: 'Sign In',
  dashboard: 'Dashboard',
}

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center rounded-md bg-green-500/30 px-3 py-2 text-xs font-medium text-green-400 no-underline ring-1 ring-inset ring-green-500/20 hover:bg-green-500/20"
      >
        {TEXTS.signIn}
      </Link>
    )
  }

  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center rounded-md bg-blue-500/30 px-3 py-2 text-xs font-medium text-blue-400 no-underline ring-1 ring-inset ring-blue-500/20 hover:bg-blue-500/20"
    >
      {TEXTS.dashboard}
    </Link>
  )
}
