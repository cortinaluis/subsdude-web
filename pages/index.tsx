import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import VideoEditor from '../components/VideoEditor/VideoEditor';
import { VideoEditorProvider } from '../context/videoEditor';
import { SubtitleProvider } from '../context/subtitle';
import FileUpload from '../components/FileUpload';
import { useState } from 'react';
import { VideoMeta } from '../types/types';


const Home: NextPage = () => {
  const [videoMeta, setVideoMeta] = useState <VideoMeta | null>(null);

  const handleVideoSelect = (videoMeta: VideoMeta) => {
    setVideoMeta(videoMeta);
  };

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
            <FileUpload onVideoSelect={handleVideoSelect}/>
            {
              videoMeta !== null &&
                <VideoEditor videoMeta={videoMeta}/>
            }
          </SubtitleProvider>
        </VideoEditorProvider>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Home;
