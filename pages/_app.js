import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import styles from 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    // your custom props here
  }),
}

export default MyApp
