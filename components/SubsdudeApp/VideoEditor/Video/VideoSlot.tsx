import { createRef, useEffect } from 'react';

import { useVideoEditorContext } from '../../../../context/videoEditor';
import styles from '../../../../styles/VideoSlot.module.scss';
import { VideoMeta } from '../../../../types/types';
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
  videoSelectedTime,
}: Props) => {
  const videoRef = createRef<HTMLVideoElement>();
  const { isPlaying } = useVideoEditorContext();

  const handleTimeUpdate = (event: any) => {
    onTimeUpdate(event.target.currentTime);
  };

  const handleLoadedData = (event: any) => {
    onVideoLoad(event.target.duration);
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
      src={videoMeta.videoSrc}
    >
      <SubtitleTrack src={videoMeta.subtitleSrc}/>
    </video>
  );
};

export default VideoSlot;