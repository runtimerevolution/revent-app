import axios from 'axios'
import { camelizeKeys } from 'humps'
import { OAuthCredential, OAuthUrl, Profile } from './type'

export type { OAuthCredential, OAuthUrl }

export const TOKEN_KEY = 'token'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const client = axios.create({
  baseURL: BASE_URL,
})

client.interceptors.response.use((response) => {
  if (response.data) {
    response.data = camelizeKeys(response.data)
  }
  return response
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  return config
})
