import styles from '../styles/Home.module.css'
import { LayoutProps } from './helpers/interfaces'
import Navbar from './Navbar/Navbar'

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
