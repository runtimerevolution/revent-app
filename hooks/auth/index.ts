import apiClient from '../../services/http-common'
import { Session } from '../../types/auth'

function mapSession(item): Session {
  return {
    access: item?.access ?? '',
    refresh: item?.refresh ?? '',
    user: {
      email: item?.user?.email ?? '',
      first_name: item?.user?.first_name ?? '',
      last_name: item?.user?.last_name ?? '',
      pk: item?.user?.pk ?? '',
    },
  }
}
const getUserSession = async (code) => {
  const session = await apiClient
    .post(
      'auth/google/',
      { code: code },
      {
        validateStatus: (status) => status === 200,
        transformResponse: [
          (data) => {
            const newData = JSON.parse(data)
            return mapSession(newData) ?? {}
          },
        ],
      }
    )
    .then((res) => {
      return res?.data
    })
    .catch(() => {
      return null
    })
  return session
}

export { getUserSession }
