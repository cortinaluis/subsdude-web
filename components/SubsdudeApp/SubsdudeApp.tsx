
import { useVideoEditorContext } from '../../context/videoEditor';
import styles from '../../styles/SubsdudeApp.module.scss';
import CueList from './CueList';
import FileSelector from './FileSelector';
import VideoEditor from './VideoEditor/VideoEditor';

const SubsdudeApp = () => {
  const { videoMeta } = useVideoEditorContext();

  return videoMeta === null ?
    <FileSelector /> :
    <div className={styles.subsdudeApp}>
      <VideoEditor/>
      <CueList/>
    </div>;
};

export default SubsdudeApp;
