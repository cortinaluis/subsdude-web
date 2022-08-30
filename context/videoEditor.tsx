import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

import { VideoMeta } from '../types/types';

interface IVideoEditorContext {
    videoMeta: VideoMeta | null;
    setVideoMeta: Dispatch<SetStateAction<VideoMeta | null>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    videoDuration: number;
    setVideoDuration: Dispatch<SetStateAction<number>>;
    videoCurrentTime: number;
    setVideoCurrentTime: Dispatch<SetStateAction<number>>;
    videoSelectedTime: number;
    setVideoSelectedTime: Dispatch<SetStateAction<number>>;
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

