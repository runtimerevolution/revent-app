import { PropsWithChildren } from 'react'
import styles from '../styles/Home.module.css'
import Navbar from './Navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
