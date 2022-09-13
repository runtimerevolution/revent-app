import Footer from 'components/Footer'
import Header from 'components/Header'
import PropTypes from 'prop-types'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div /*className={styles.container}*/>
      <Header />
      <main /*className={styles.main}*/>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.object,
}
