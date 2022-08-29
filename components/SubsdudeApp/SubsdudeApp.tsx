
import { useVideoEditorContext } from '../../context/videoEditor';
import styles from '../../styles/SubsdudeApp.module.scss';
import CueList from './CueList';
import FileSelector from './FileSelector';
import VideoEditor from './VideoEditor/VideoEditor';

const SubsdudeApp = () => {
  const { videoMeta, setVideoMeta } = useVideoEditorContext();

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