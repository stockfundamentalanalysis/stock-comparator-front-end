'use client'

import { cn } from '@/lib/classNames'
import { useFormStatus } from 'react-dom'

interface TextTypes {
  pending: string
}

const TEXTS: TextTypes = {
  pending: 'Loading...',
}

export function SubmitButton({
  cta,
  color = 'green',
}: {
  cta: string
  color?: 'green' | 'red'
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        'block w-full cursor-pointer rounded-md px-3 py-2 text-sm font-semibold transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none',
        {
          'bg-green-400': color === 'green',
          'bg-red-400': color === 'red',
        }
      )}
    >
      {pending ? TEXTS.pending : cta}
    </button>
  )
}
