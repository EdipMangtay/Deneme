// Component Imports
import ResetPassword from '@/views/auth/ResetPassword'

import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('Şifre Yenile')

const ResetPasswordPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <ResetPassword />
    </div>
  )
}

export default ResetPasswordPage
