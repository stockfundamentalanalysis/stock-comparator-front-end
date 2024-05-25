'use client'

import { useFormStatus } from 'react-dom'

interface TextTypes {
  pending: string
}

const TEXTS: TextTypes = {
  pending: 'Loading...',
}

export function SubmitButton({ cta }: { cta: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="text-dark block w-full cursor-pointer rounded-md bg-green-400 px-3 py-2 text-sm font-semibold transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none"
    >
      {pending ? TEXTS.pending : cta}
    </button>
  )
}
