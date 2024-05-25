import LoginForm from '@/app/login/_components/LoginForm'
import LogoutForm from '@/app/login/_components/LogoutForm'
import { createClient } from '@/lib/supabase/server'

interface TextTypes {
  isLoggedIn: string
}

const TEXTS: TextTypes = {
  isLoggedIn: 'You are logged in as',
}

const Login = async (): Promise<JSX.Element> => {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return (
      <div className="flex flex-col space-y-6">
        <p className="text-sm">
          {TEXTS.isLoggedIn}{' '}
          <span className="font-semibold">{data.user.email}</span>
        </p>
        <LogoutForm />
      </div>
    )
  }

  return <LoginForm />
}

export default Login
