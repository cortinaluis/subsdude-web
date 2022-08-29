import { createContext, useContext, useState } from 'react';

import { VideoMeta } from '../types/types';

interface IVideoEditorContext {
    videoMeta: VideoMeta | null;
    setVideoMeta: (newVideoMeta: VideoMeta) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    videoDuration: number;
    setVideoDuration: (newDuration: number) => void;
    videoCurrentTime: number;
    setVideoCurrentTime: (newVideoCurrentTime: number) => void;
    videoSelectedTime: number;
    setVideoSelectedTime: (newVideoSelectedTime: number) => void;
}

const defaultVideoEditorContext: IVideoEditorContext = {
  videoMeta: null,
  setVideoMeta: () => {
  },
  isPlaying: false,
  setIsPlaying: () => {
  },
  videoDuration: 0,
  setVideoDuration: () => {
  },
  videoCurrentTime: 0,
  setVideoCurrentTime: () => {
  },
  videoSelectedTime: 0,
  setVideoSelectedTime: () => {
  }
};

const VideoEditorContext =
    createContext<IVideoEditorContext>(defaultVideoEditorContext);

export const VideoEditorProvider = ({ children }: any) => {
  const [videoDuration, updateVideoDuration]
        = useState<number>(defaultVideoEditorContext.videoDuration);
  const [videoCurrentTime, updateVideoCurrentTime]
        = useState<number>(defaultVideoEditorContext.videoCurrentTime);
  const [isPlaying, updateIsPlaying]
        = useState<boolean>(defaultVideoEditorContext.isPlaying);
  const [videoSelectedTime, updateVideoSelectedTime]
        = useState<number>(defaultVideoEditorContext.videoSelectedTime);
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);


  return (
    <VideoEditorContext.Provider
      value={{
        videoMeta,
        setVideoMeta,
        isPlaying,
        setIsPlaying: updateIsPlaying,
        videoDuration,
        setVideoDuration: updateVideoDuration,
        videoCurrentTime: videoCurrentTime,
        setVideoCurrentTime: updateVideoCurrentTime,
        videoSelectedTime,
        setVideoSelectedTime: updateVideoSelectedTime
      }}
    >
      {children}
    </VideoEditorContext.Provider>
  );
};

export const useVideoEditorContext = () => useContext(VideoEditorContext);

