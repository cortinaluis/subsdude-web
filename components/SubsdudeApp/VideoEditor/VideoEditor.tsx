import { KeyboardEvent, useCallback, useEffect, useState } from 'react';

import { useSubtitleContext } from '../../../context/subtitle';
import { useVideoEditorContext } from '../../../context/videoEditor';
import { downloadFile, logSetupComplete } from '../../../helpers/helpers';
import styles from '../../../styles/VideoEditor.module.scss';
import { VideoMeta } from '../../../types/types';
import SubtitleInput from './SubtitleInput';
import Timeline from './Timeline';
import VideoSlot from './Video/VideoSlot';

type Props = {
    videoMeta: VideoMeta;
}

const VideoEditor = ({ videoMeta }: Props) => {
  const {
    allCues,
    activeCues,
    mapAllCuesToWebVTT,
  } = useSubtitleContext();

  const {
    isPlaying,
    setIsPlaying,
    setVideoDuration,
    setVideoCurrentTime,
    videoSelectedTime,
  } = useVideoEditorContext();

  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);


  const handleSaveVtt = () => {
    const vttFile = mapAllCuesToWebVTT();
    downloadFile(vttFile, 'projectName.vtt', document);
  };

  const handleInputChange = useCallback((cueId: string, value: string) => {
    if (allCues !== null) {
      allCues[Number(cueId) - 1].text = value;
    } else {
      console.log('nuuuuu');
    }
  }, [allCues]);

  const handleVideoLoad = (videoDuration: number) => {
    console.log(videoDuration);
    setVideoDuration(videoDuration);
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
        videoMeta={videoMeta}
        onTimeUpdate={setVideoCurrentTime}
        videoSelectedTime={videoSelectedTime}
      />
      {
        isEditorReady &&
              <>
                <div className={styles.videoEditorControls}>
                  <SubtitleInput
                    onInputChange={handleInputChange}
                    activeCues={activeCues}
                  />
                  <button onClick={handleSaveVtt}> save new vtt</button>
                </div>
                <Timeline/>
              </>
      }

    </div>
  );
};


export default VideoEditor;