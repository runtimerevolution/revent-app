export interface OAuthUrl {
  authorizationUrl: string
}

export interface OAuthCredential {
  state: string
  code: string
}

export interface Profile {
  id: string
  firstName: string
  lastName: string
  email: string
}
