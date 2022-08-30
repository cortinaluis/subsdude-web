import type { NextPage } from 'next';
import Head from 'next/head';

import SubsdudeApp from '../components/SubsdudeApp/SubsdudeApp';
import { SubtitleProvider } from '../context/subtitle';
import { VideoEditorProvider } from '../context/videoEditor';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Subsdude</title>
        <meta name="description" content="Subsdude!"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <VideoEditorProvider>
          <SubtitleProvider>
            <SubsdudeApp/>
          </SubtitleProvider>
        </VideoEditorProvider>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Home;
