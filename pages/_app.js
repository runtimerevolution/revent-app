import React from 'react'
import Layout from 'components/Layout'
import PropTypes from 'prop-types'
// eslint-disable-next-line
import styles from 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({
    // your custom props here
  }),
}

export default MyApp
