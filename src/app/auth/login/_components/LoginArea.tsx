import LoginForm from '@/app/auth/login/_components/LoginForm'
import LogoutForm from '@/app/auth/login/_components/LogoutForm'
import { createClient } from '@/lib/supabase/server'

interface TextTypes {
  isLoggedIn: string
}

const TEXTS: TextTypes = {
  isLoggedIn: 'You are logged in as',
}

const LoginArea = async (): Promise<JSX.Element> => {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return (
      <div className="flex flex-col space-y-6">
        <p className="text-sm text-white">
          {TEXTS.isLoggedIn}{' '}
          <span className="font-semibold">{data.user.email}</span>
        </p>
        <LogoutForm />
      </div>
    )
  }

  return <LoginForm />
}

export default LoginArea
