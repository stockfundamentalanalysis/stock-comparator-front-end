import { SubmitButton } from '@/app/login/_components/SubmitButton'
import { logout } from '@/app/login/actions'

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
