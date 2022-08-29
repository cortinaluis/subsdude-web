import { ChangeEvent } from 'react';

import { useVideoEditorContext } from '../../context/videoEditor';
import styles from '../../styles/FileSelector.module.scss';
import { VideoMeta } from '../../types/types';

const FileSelector = () => {
  const { setVideoMeta } = useVideoEditorContext();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      console.log(event.target.files);

      const videoMeta: VideoMeta = Object.values(event.target.files)
        .reduce<VideoMeta>((prev, curr): VideoMeta => {
          if (curr.name.endsWith('.vtt')) {
            return { ...prev, subtitleSrc: URL.createObjectURL(curr) };
          }
          return { ...prev, videoSrc: URL.createObjectURL(curr) };
        }, { videoSrc: '', subtitleSrc: '' });

      console.log(videoMeta);
      setVideoMeta(videoMeta);
    }
  };

  return (
    <div className={styles.fileSelector}>
      <label htmlFor="">
                Select video and subtitle
        <input type="file" multiple onChange={handleFileChange}/>
      </label>
    </div>
  );
};

export default FileSelector;
