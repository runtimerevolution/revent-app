import { useMutation, useQuery } from 'react-query'
import { TOKEN_KEY, client } from 'api'
import { OAuthCredential, OAuthUrl, Profile } from 'api/type'

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
  })
export { useGoogleAuthLink, useGoogleAuthToken, useProfile }
