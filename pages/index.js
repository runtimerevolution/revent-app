import Head from 'next/head'
import Contest from '../components/Contest'
import CurrentPhotos from '../components/CurrentPhotos'
import SubmitPhoto from '../components/SubmitPhoto'
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
        <p> Current contest: </p>
        <Contest />
        <p> Current photos: </p>
        <CurrentPhotos />
        <p> Submit photo: </p>
        <SubmitPhoto />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
