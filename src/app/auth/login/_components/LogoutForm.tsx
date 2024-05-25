import { logout } from '@/app/auth/actions'
import { SubmitButton } from '@/app/auth/login/_components/SubmitButton'

interface TextTypes {
  logout: string
}

const TEXTS: TextTypes = {
  logout: 'Sign Out',
}

const LogoutForm = (): JSX.Element => {
  return (
    <form action={logout}>
      <SubmitButton cta={TEXTS.logout} />
    </form>
  )
}

export default LogoutForm
