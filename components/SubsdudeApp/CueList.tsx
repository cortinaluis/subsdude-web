import { createRef, FormEvent, useCallback, useEffect, useState } from 'react';

import { useSubtitleContext } from '../../context/subtitle';
import { useVideoEditorContext } from '../../context/videoEditor';
import styles from '../../styles/CueList.module.scss';

const CueList = () => {
  const cueListRef = createRef<HTMLDivElement>();
  const { setIsPlaying, setVideoSelectedTime } = useVideoEditorContext();
  const { allCues, selectedCue, setSelectedCue, hoveredCue, setHoveredCue } =
        useSubtitleContext();

  const [pauseVideoOnCueChange, setPauseVideoOnCueChange] =
        useState<boolean>(true);

  const handleCueClick = (cue: VTTCue) => {
    if (pauseVideoOnCueChange) {
      setIsPlaying(false);
    }
    setVideoSelectedTime(cue.startTime);
    setSelectedCue(cue);
  };

  const handleMouseMove = (cue: VTTCue) => {
    setHoveredCue(cue);
  };

  const handleInputChange = useCallback(
    (cueId: string, event: FormEvent<HTMLTextAreaElement>) => {
      const target = event.target as HTMLTextAreaElement;
      const { value } = target;
      allCues[Number(cueId) - 1].text = value;

      target.style.height = 'min-content';
      target.style.height = `${target.scrollHeight}px`;
    },
    [allCues]
  );

  const getCueClasses = useCallback(
    (cue: VTTCue): string =>
      [
        styles.cue,
        cue.id === selectedCue?.id ? styles.selectedCue : '',
        cue.id === hoveredCue?.id ? styles.hoveredCue : '',
      ].join(' '),
    [hoveredCue, selectedCue]
  );

  useEffect(() => {
    if (cueListRef.current !== null && selectedCue !== null) {
      for (const child of cueListRef.current.children) {
        if ((child as HTMLTextAreaElement).value === selectedCue.text) {
          (child as HTMLTextAreaElement).focus();
          (child as HTMLTextAreaElement).select();
        }
      }
    }
  }, [selectedCue]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className={styles.cueList} ref={cueListRef}>
        {allCues.map((cue: VTTCue) => (
          <textarea
            key={cue.id}
            className={getCueClasses(cue)}
            onClick={() => handleCueClick(cue)}
            onMouseMove={() => handleMouseMove(cue)}
            onInput={(event, cueId = cue.id) => handleInputChange(cueId, event)}
            defaultValue={cue.text}
          />
        ))}
      </div>
    </div>
  );
};

export default CueList;
