'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export async function login(formData: FormData) {
  const supabase = createClient()

  const formValues = loginSchema.safeParse({ email: formData.get('email') })

  if (formValues.error) {
    redirect('/error')
  }

  const { data } = formValues

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: { shouldCreateUser: false },
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
