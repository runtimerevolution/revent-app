import { PropsWithChildren } from 'react'
import styles from '../styles/Home.module.css'
import { LayoutProps } from './helpers/interfaces'
import Navbar from './Navbar/Navbar'

const Layout = ({ notifications, children }: LayoutProps) => {
  return (
    <div>
      <Navbar notifications={notifications} />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
