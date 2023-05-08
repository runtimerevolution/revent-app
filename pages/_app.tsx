import React from 'react'
import PropTypes from 'prop-types'
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Component {...pageProps} />
    </div>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({
    // your custom props here
  }),
}

export default MyApp
