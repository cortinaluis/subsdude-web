import { ChangeEvent } from 'react';

import styles from '../../styles/FileUpload.module.scss';
import { VideoMeta } from '../../types/types';

type Props = {
    onVideoSelect: (videoMeta: VideoMeta) => void;
}

const FileUpload = ({ onVideoSelect }: Props) => {
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
      onVideoSelect(videoMeta);
    }
  };

  return (
    <div className={styles.fileUpload}>
      <label htmlFor="">
                Select video and subtitle
        <input type="file" multiple onChange={handleFileChange}/>
      </label>
    </div>
  );
};

export default FileUpload;
