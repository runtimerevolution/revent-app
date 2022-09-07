import Head from "next/head";
import styles from "../styles/Home.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Revent</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Revent!</h1>
        {children}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Layout;
