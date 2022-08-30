import { createRef, useEffect } from 'react';

import { useVideoEditorContext } from '../../../../context/videoEditor';
import styles from '../../../../styles/VideoSlot.module.scss';
import SubtitleTrack from './SubtitleTrack';

type Props = {
    onVideoLoad: () => void;
}

const VideoSlot = ({ onVideoLoad }: Props) => {
  const videoRef = createRef<HTMLVideoElement>();

  const {
    videoMeta,
    setVideoDuration,
    isPlaying,
    setVideoCurrentTime,
    videoSelectedTime,
  } = useVideoEditorContext();

  const handleTimeUpdate = (event: any) => {
    setVideoCurrentTime(event.target.currentTime);
  };

  const handleLoadedData = (event: any) => {
    setVideoDuration(event.target.duration);
    onVideoLoad();
  };

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.currentTime = videoSelectedTime;
      isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
  },
  // disabled eslint in next line, if we include videoRef it breaks the player
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [videoSelectedTime, isPlaying]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      className={styles.videoSlotVideo}
      src={videoMeta?.videoSrc}
    >
      <SubtitleTrack />
    </video>
  );
};

export default VideoSlot;
