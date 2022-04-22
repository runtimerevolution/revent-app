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
          <div style={{ marginRight: '100px' }}>
            <p> Current photos: </p>
            <CurrentPhotos
              contestID={'d52d3bbf-b458-4581-a468-907902dccb77'}
              userID={'791c77ea-426a-4d12-bf4f-611ba3e67b09'}
            />
          </div>
          <div style={{ marginRight: '100px' }}>
            <p> Comments on photo: </p>
            <CommentsOnPhoto photoID={'0246c1ec-30b2-44f1-9fe9-bc934ff5f281'} />
          </div>
          <div>
            <p> Votes on photo: </p>
            <VotesOnPhoto photoID={'0246c1ec-30b2-44f1-9fe9-bc934ff5f281'} />
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
            <SubmitPhoto
              idContest={'d52d3bbf-b458-4581-a468-907902dccb77'}
              idUser={'791c77ea-426a-4d12-bf4f-611ba3e67b09'}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
