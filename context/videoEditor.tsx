import { createContext, useContext, useState } from 'react';

interface IVideoEditorContext {
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

  return (
    <VideoEditorContext.Provider
      value={{
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

