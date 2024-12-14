// Component Imports
import ForgotPassword from '@/views/auth/ForgotPassword'

import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('Şifremi Unuttum')

const ForgotPasswordPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage
