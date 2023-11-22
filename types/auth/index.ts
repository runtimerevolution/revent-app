type User = {
  pk?: string
  email?: string
  first_name?: string
  last_name?: string
}

type Session = {
  access?: string
  refresh?: string
  user?: User
}

export type { Session, User }
