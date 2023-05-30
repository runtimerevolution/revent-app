import { PropsWithChildren } from 'react'
import { ReactNode } from 'react'
import styles from '../styles/Home.module.css'

import Navbar from './Navbar/Navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
