import { createClient } from '@/lib/supabase/server'
import { ApplicationLayout } from './application-layout'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return <>{children}</>

  return <ApplicationLayout user={user}>{children}</ApplicationLayout>
}
