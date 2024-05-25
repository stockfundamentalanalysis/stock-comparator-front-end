import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center rounded-md bg-green-500/30 px-3 py-2 text-xs font-medium text-green-400 no-underline ring-1 ring-inset ring-green-500/20 hover:bg-green-500/20"
      >
        Login
      </Link>
    )
  }

  return (
    <form action={signOut}>
      <button className="inline-flex items-center rounded-md bg-red-500/30 px-3 py-2 text-xs font-medium text-red-400 no-underline ring-1 ring-inset ring-red-500/20 hover:bg-red-500/20">
        Logout
      </button>
    </form>
  )
}
