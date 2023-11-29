import { useMutation, useQuery } from 'react-query'
import {
  OAuthCredential,
  TOKEN_KEY,
  getGoogleAuthLink,
  getGoogleAuthToken,
  getProfile,
} from '../../api'

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
