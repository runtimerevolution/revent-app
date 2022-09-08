import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Header = () => {
  return (
    <div>
      <Head>
        <title>Revent</title>
      </Head>

      <h1 className={styles.title}>Welcome to Revent!</h1>
    </div>
  )
}

export default Header
