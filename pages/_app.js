import React from 'react'
//import Layout from 'components/Layout'
import PropTypes from 'prop-types'
//import styles from 'styles/globals.css'

function MyApp() {
  return <h1>Hello world React!</h1>
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({
    // your custom props here
  }),
}

export default MyApp
