import { createRef, useEffect } from 'react';

import styles from '../../../styles/VideoSlot.module.scss';
import { VideoMeta } from '../../../types/types';
import SubtitleTrack from './SubtitleTrack';

type Props = {
    videoMeta: VideoMeta;
    onVideoLoad: (videoDuration: number) => void;
    onTimeUpdate: (newCurrentTime: number) => void;
    videoSelectedTime: number;
}

const VideoSlot = ({
  videoMeta,
  onVideoLoad,
  onTimeUpdate,
  videoSelectedTime
}: Props) => {
  const videoRef = createRef<HTMLVideoElement>();

  const handleTimeUpdate = (event: any) => {
    onTimeUpdate(event.target.currentTime);
  };

  const handleLoadedData = (event: any) => {
    onVideoLoad(event.target.duration);
  };

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.currentTime = videoSelectedTime;
    }
    // disabled eslint in next line, if we include videoRef it breaks the player
  }, [videoSelectedTime]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <video
      ref={videoRef}
      muted
      controls
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      className={styles.videoSlotVideo}
      src={videoMeta.videoSrc}
    >
      <SubtitleTrack src={videoMeta.subtitleSrc}/>
    </video>
  );
};

export default VideoSlot;