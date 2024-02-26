import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const httpLink = createUploadLink({
  uri: (process.env.NEXT_PUBLIC_BACKEND_URL || '/') + 'graphql/',
})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
