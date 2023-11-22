import React, { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apolloClient'
import { SessionContext } from '../constants'

export default function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null)
  console.log(session)
  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionContext.Provider>
  )
}
