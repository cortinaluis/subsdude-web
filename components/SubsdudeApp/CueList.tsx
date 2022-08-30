import { useCallback, useState } from 'react';

import { useSubtitleContext } from '../../context/subtitle';
import { useVideoEditorContext } from '../../context/videoEditor';
import styles from '../../styles/CueList.module.scss';

const CueList = () => {
  const {
    setIsPlaying,
    setVideoSelectedTime
  } = useVideoEditorContext();

  const {
    allCues,
    activeCues,
  } = useSubtitleContext();

  const [pauseVideoOnCueChange, setPauseVideoOnCueChange] =
    useState<boolean>(true);

  const handleCueClick = (cue: VTTCue) => {
    if (pauseVideoOnCueChange) {
      setIsPlaying(false);
    }
    setVideoSelectedTime(Math.round(cue.startTime));
  };

  const getCueClasses = useCallback((cue: VTTCue): string =>
    [
      styles.cue, activeCues.includes(cue) ? styles.activeCue : ''
    ].join(' '), [activeCues]);

  return (
    <div className={styles.cueListContainer}>
      <label>
        <input
          type="checkbox"
          name="shouldPause"
          checked={pauseVideoOnCueChange}
          onChange={() => setPauseVideoOnCueChange(!pauseVideoOnCueChange)}
        />
          Pause video on cue change
      </label>
      <div className={styles.cueList}>
        {
          allCues.length && allCues.map((cue: VTTCue) => (
            <div
              key={cue.id}
              className={getCueClasses(cue)}
              onClick={() => handleCueClick(cue)}
            >
              {cue.text}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CueList;