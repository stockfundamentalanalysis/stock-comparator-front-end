'use client'

import { login } from '@/app/auth/actions'
import { SubmitButton } from '@/app/auth/login/_components/SubmitButton'
import { useToast } from '@/app/toast'
import { useFormStatus } from 'react-dom'

interface TextTypes {
  email: {
    label: string
    placeholder: string
  }
  login: string
  logout: string
}

const TEXTS: TextTypes = {
  email: {
    label: 'Email Address',
    placeholder: 'hi@stockcomparator.com',
  },
  login: 'Sign In',
  logout: 'Sign Out',
}

const LoginForm = (): JSX.Element => {
  const { pending } = useFormStatus()
  const { showToast } = useToast()

  async function clientAction(formData: FormData) {
    const result = await login(formData)

    if (result.message) {
      showToast(result.message)
    }
  }

  return (
    <form action={clientAction} className="flex flex-col space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          {TEXTS.email.label}
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            disabled={pending}
            placeholder={TEXTS.email.placeholder}
            autoComplete="email"
            required
            className="focus:border-fluor-green focus:ring-fluor-green block w-full rounded-md border border-gray-700 bg-gray-800 text-sm text-white placeholder:text-gray-600"
          />
        </div>
      </div>

      <SubmitButton cta={TEXTS.login} />
    </form>
  )
}

export default LoginForm
