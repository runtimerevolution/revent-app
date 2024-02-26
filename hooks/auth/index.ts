import { useMutation, useQuery } from 'react-query'
import { TOKEN_KEY, client } from 'api'
import { OAuthCredential, OAuthUrl, Profile } from 'api/type'
import router from 'next/router'

export const USER_INFO = 'user'

export const getGoogleAuthLink = async () => {
  const response = await client.get<OAuthUrl>('/auth/o/google-oauth2/', {
    params: {
      redirect_uri:
        process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin,
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

export const logoutUser = async () => {
  const response = await client.post('/auth/token/logout/')
  return response.data
}

const useGoogleAuthLink = () =>
  useQuery({
    queryKey: ['google_oauth'],
    queryFn: getGoogleAuthLink,
    cacheTime: 0,
    enabled: false,
  })

const useGoogleAuthToken = () =>
  useMutation({
    mutationKey: ['google_auth_token'],
    mutationFn: (credential: OAuthCredential) => getGoogleAuthToken(credential),
    onSuccess: (data) => {
      const { access } = data
      localStorage.setItem(TOKEN_KEY, access)
    },
  })

const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    onSuccess: (data) => {
      const { id } = data
      localStorage.setItem(USER_INFO, id)
    },
  })

const handleNavigation = (path: string) => {
  router.push(path)
}
const useLogout = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_INFO)
      handleNavigation('/')
      window.location.reload()
    },
  })

export { useGoogleAuthLink, useGoogleAuthToken, useProfile, useLogout }
