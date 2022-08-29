import { useState } from 'react';

import styles from '../../styles/SubsdudeApp.module.scss';
import { VideoMeta } from '../../types/types';
import CueList from './CueList';
import FileSelector from './FileSelector';
import VideoEditor from './VideoEditor/VideoEditor';

const SubsdudeApp = () => {
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);

  const handleVideoSelect = (videoMeta: VideoMeta) => {
    setVideoMeta(videoMeta);
  };

  return videoMeta === null ?
    <FileSelector onVideoSelect={handleVideoSelect}/> :
    <div className={styles.subsdudeApp}>
      <VideoEditor videoMeta={videoMeta}/>
      <CueList/>
    </div>;
};

export default SubsdudeApp;