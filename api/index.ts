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
  console.log(token)
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  console.log(config)
  return config
})

export const getGoogleAuthLink = async () => {
  const response = await client.get<OAuthUrl>('/auth/o/google-oauth2/', {
    params: {
      redirect_uri: process.env.NEXT_PUBLIC_FRONTEND_URL,
    },
    withCredentials: true,
  })
  return response.data
}

export const getGoogleAuthToken = async (credential: OAuthCredential) => {
  const response = await client.post('/auth/o/google-oauth2/', credential, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    withCredentials: true,
  })
  return response.data
}

export const getProfile = async () => {
  const response = await client.get<Profile>('/auth/users/me/')
  return response.data
}
