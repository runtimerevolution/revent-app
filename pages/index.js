import Head from 'next/head'
import CommentsOnPhoto from '../components/CommentsOnPhoto'
import Contest from '../components/Contest'
import CurrentPhotos from '../components/CurrentPhotos'
import SubmitContest from '../components/SubmitContest'
import SubmitPhoto from '../components/SubmitPhoto'
import VotesOnPhoto from '../components/VotesOnPhoto'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Revent</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Revent!</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <div style={{ marginRight: '100px' }}>
            <p> Current contest: </p>
            <Contest />
          </div>
          <div>
            <p> Current photos: </p>
            <CurrentPhotos />
          </div>
          <div>
            <p> Comments on photo: </p>
            <CommentsOnPhoto photoContent={'qualquercoisa'} />
          </div>
          <div>
            <p> Votes on photo: </p>
            <VotesOnPhoto photoContent={'qualquercoisa'} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <div style={{ marginRight: '100px' }}>
            <p> Submit Contest: </p>
            <SubmitContest />
          </div>
          <div>
            <p> Submit Photo: </p>
            <SubmitPhoto />
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
