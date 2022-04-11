import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Revent</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Revent!
        </h1>

      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
