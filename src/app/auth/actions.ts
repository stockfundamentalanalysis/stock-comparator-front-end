'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export async function login(formData: FormData) {
  const formValues = loginSchema.safeParse({ email: formData.get('email') })

  if (formValues.error) {
    redirect('/auth/login?message=INVALID_EMAIL')
  }

  const { data } = formValues

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: { shouldCreateUser: false },
  })

  if (error) {
    redirect('/auth/login?message=SIGN_IN_ERROR')
  }

  redirect('/auth/login?message=CHECK_EMAIL')
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/auth/login?message=SIGN_OUT_ERROR')
  }

  redirect('/')
}
