import type { LoginRequestDto, LoginResponseDto } from '@/generated/api-client'
import { AuthApi } from '@/generated/api-client'
import { apiConfiguration } from '@/utils/apiClient'

const authApi = new AuthApi(apiConfiguration)

/**
 * Login API call
 * @param email User's email
 * @param password User's password
 * @returns LoginResponseDto containing the access token and user details
 */
export const login = async (email: string, password: string): Promise<LoginResponseDto> => {
  try {
    const credentials: LoginRequestDto = { email, password }
    const response = await authApi.authControllerLogin(credentials)

    if (!response.data?.payload) {
      throw new Error('Unexpected API response structure.')
    }

    return response.data.payload
  } catch (error: any) {
    console.error('Login Error:', error)

    throw new Error(error.response?.data?.message || 'Unknown error occurred.')
  }
}
