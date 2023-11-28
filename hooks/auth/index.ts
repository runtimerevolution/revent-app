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

// function mapSession(item): Session {
//   return {
//     access: item?.access ?? '',
//     refresh: item?.refresh ?? '',
//     user: {
//       email: item?.user?.email ?? '',
//       first_name: item?.user?.first_name ?? '',
//       last_name: item?.user?.last_name ?? '',
//       pk: item?.user?.pk ?? '',
//     },
//   }
// }
// const getUserSession = async (code) => {
//   const session = await apiClient
//     .post(
//       'auth/google/',
//       { code: code },
//       {
//         validateStatus: (status) => status === 200,
//         transformResponse: [
//           (data) => {
//             const newData = JSON.parse(data)
//             return mapSession(newData) ?? {}
//           },
//         ],
//       }
//     )
//     .then((res) => {
//       return res?.data
//     })
//     .catch(() => {
//       return null
//     })
//   return session
// }

// const userLogout = async (tokenBearer) => {
//   const config: AxiosRequestConfig = {}
//   if (tokenBearer) config.headers = { Authorization: `Bearer ${tokenBearer}` }
//   const response = await apiClient
//     .post('auth/logout/', null, config)
//     .then((res) => {
//       return res?.data
//     })
//     .catch(() => {
//       return null
//     })
//   return response
// }

// export { getUserSession, userLogout }
