import { useState } from 'react';

import { VideoMeta } from '../../types/types';
import FileSelector from './FileSelector';
import VideoEditor from './VideoEditor/VideoEditor';

const SubsdudeApp = () => {
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);

  const handleVideoSelect = (videoMeta: VideoMeta) => {
    setVideoMeta(videoMeta);
  };

  return videoMeta === null ?
    <FileSelector onVideoSelect={handleVideoSelect}/> :
    <VideoEditor videoMeta={videoMeta}/>;
};

export default SubsdudeApp;