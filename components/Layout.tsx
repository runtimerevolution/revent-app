import PropTypes from 'prop-types'
import { PropsWithChildren } from 'react'
import styles from '../styles/Home.module.css'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
