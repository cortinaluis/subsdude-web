import { KeyboardEvent, useEffect, useState } from 'react';

import { useSubtitleContext } from '../../../context/subtitle';
import { useVideoEditorContext } from '../../../context/videoEditor';
import { downloadFile, logSetupComplete } from '../../../helpers/helpers';
import styles from '../../../styles/VideoEditor.module.scss';
import SubtitleInput from './SubtitleInput';
import Timeline from './Timeline';
import VideoSlot from './Video/VideoSlot';

const VideoEditor = () => {
  const { mapAllCuesToWebVTT } = useSubtitleContext();
  const { isPlaying, setIsPlaying } = useVideoEditorContext();

  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);

  const handleSaveVtt = () => {
    const vttFile = mapAllCuesToWebVTT();
    downloadFile(vttFile, 'projectName.vtt', document);
  };

  const handleVideoLoad = () => {
    setIsEditorReady(true);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    logSetupComplete('<VideoEditor/>');
  }, []);

  return (
    <div
      className={styles.videoEditorContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <VideoSlot
        onVideoLoad={handleVideoLoad}
      />
      {
        isEditorReady &&
              <>
                <div className={styles.videoEditorControls}>
                  <SubtitleInput/>
                  <button onClick={handleSaveVtt}> save new vtt</button>
                </div>
                <Timeline/>
              </>
      }

    </div>
  );
};

export default VideoEditor;
