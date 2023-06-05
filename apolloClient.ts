import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // Replace with your Strawberry backend URL
  cache: new InMemoryCache(),
})

export default client
