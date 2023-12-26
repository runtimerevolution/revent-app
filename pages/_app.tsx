import Layout from '../components/Layout'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apolloClient'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ApolloProvider>
    </QueryClientProvider>
  )
}
