import { createContext } from 'react'

export const SessionContext = createContext(null)

export const googleLoginLink =
  'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' +
  process.env.GOOGLE_REDIRECT_URL +
  '&prompt=consent&response_type=code&client_id=' +
  process.env.GOOGLE_CLIENT_ID +
  '&scope=openid%20email%20profile&access_type=offline'
