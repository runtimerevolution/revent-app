import PropTypes from 'prop-types'
import styles from '../styles/Home.module.css'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.object,
}
