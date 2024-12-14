// Component Imports
import Login from '@/views/auth/Login'

import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('Giriş')

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <Login />
    </div>
  )
}

export default LoginPage
