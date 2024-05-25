'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export async function login(formData: FormData): Promise<{ message: string }> {
  const supabase = createClient()

  const formValues = loginSchema.safeParse({ email: formData.get('email') })

  if (formValues.error) {
    return {
      message: 'Not valid email address.',
    }
  }

  const { data } = formValues

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: { shouldCreateUser: false },
  })

  if (error) {
    return {
      message: 'There was an error. Please try again.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout(): Promise<{ message: string }> {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      message: 'There was an error. Please try again.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
