import Head from 'next/head'
import Contest from '../components/Contest'
import CurrentPhotos from '../components/CurrentPhotos'
import SubmitContest from '../components/SubmitContest'
import SubmitPhoto from '../components/SubmitPhoto'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Revent</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Revent!</h1>
        <p> Current contest: </p>
        <Contest />
        <p> Current photos: </p>
        <CurrentPhotos />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <p> Submit Contest: </p>
            <SubmitContest />
          </div>
          <div style={{ marginRight: '10px' }}>
            <p> Submit Photo: </p>
            <SubmitPhoto />
          </div>
          <div style={{ marginRight: '10px' }}>
            <p> Submit photo: </p>
            <SubmitPhoto />
          </div>
          <div>
            <p> Submit photo: </p>
            <SubmitPhoto />
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
