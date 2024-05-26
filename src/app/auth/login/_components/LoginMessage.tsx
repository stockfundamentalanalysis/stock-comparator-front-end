'use client'

import { useSearchParams } from 'next/navigation'

type MessageType =
  | 'INVALID_EMAIL'
  | 'SIGN_IN_ERROR'
  | 'CHECK_EMAIL'
  | 'SIGN_OUT_ERROR'
  | 'INVALID_OTP'

const MESSAGES: Record<MessageType, string> = {
  INVALID_EMAIL: 'Invalid email address',
  SIGN_IN_ERROR: 'Error signing in',
  CHECK_EMAIL: 'Check your email for a sign in link',
  SIGN_OUT_ERROR: 'Error signing out',
  INVALID_OTP: 'Invalid one-time password',
}

const LoginMessage = (): JSX.Element | null => {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  if (!message) return null

  return (
    <p className="mt-4 text-sm text-blue-500">
      {MESSAGES[message as MessageType] ?? 'Something went wrong'}
    </p>
  )
}

export default LoginMessage
