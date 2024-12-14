import { Configuration } from '@/generated/api-client'

const token = localStorage.getItem('token')

export const apiConfiguration = new Configuration({
  basePath: process.env.API_URL,
  accessToken: token ? `Bearer ${token}` : undefined
})
