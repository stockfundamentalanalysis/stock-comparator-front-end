import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data?.user) {
    redirect('/auth/login')
  }

  return (
    <>
      <Heading>Welcome, this is a private page.</Heading>
      <Text className="mt-2">If you can see this, you are authenticated.</Text>
    </>
  )
}
