// Component Imports
import Register from '@/views/auth/Register'

import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('Şifre Yenile')

const ResetPasswordPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <Register />
    </div>
  )
}

export default ResetPasswordPage
