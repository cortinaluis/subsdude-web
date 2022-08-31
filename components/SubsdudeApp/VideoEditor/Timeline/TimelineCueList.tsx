import { createRef, CSSProperties, useCallback } from 'react';

import { useSubtitleContext } from '../../../../context/subtitle';
import { useVideoEditorContext } from '../../../../context/videoEditor';
import styles from '../../../../styles/TimelineCueList.module.scss';

const TimelineCueList = () => {
  const { allCues, selectedCue, hoveredCue, setHoveredCue, setSelectedCue } =
    useSubtitleContext();
  const { videoDuration } = useVideoEditorContext();
  const timelineCueListRef = createRef<HTMLDivElement>();

  const getCueClasses = useCallback(
    (cue: VTTCue): string =>
      [
        styles.timelineCue,
        cue.id === selectedCue?.id ? styles.selectedCue : '',
        cue.id === hoveredCue?.id ? styles.hoveredCue : '',
      ].join(' '),
    [hoveredCue, selectedCue]
  );

  // const [timelineWidth, setTimelineWidth] = useState<number>(0);

  const computeStyleForCue = (cue: VTTCue): CSSProperties => {
    const cueLength = cue.endTime - cue.startTime;

    const cueRepresentsPercentageOf = (cueLength * 100) / videoDuration;

    return {
      left: `${(cue.startTime * 100) / videoDuration}%`,
      width: `${(videoDuration / 100) * cueRepresentsPercentageOf}%`,
    };
  };

  // useEffect(() => {
  //   if (timelineCueListRef.current !== null) {
  //     const { width } = timelineCueListRef.current.getBoundingClientRect();
  //     setTimelineWidth(width);
  //
  //     const observer = new ResizeObserver(([entry]) => {
  //       setTimelineWidth(entry.contentRect.width);
  //     });
  //     observer.observe(timelineCueListRef.current);
  //
  //     return () => observer.disconnect();
  //   }
  // }, []);

  function handleDoubleClick(cue: VTTCue) {
    setSelectedCue(cue);
  }

  function handleMouseOver(cue: VTTCue) {
    setHoveredCue(cue);
  }

  return (
    <div className={styles.timelineCueListWrapper}>
      <div ref={timelineCueListRef} className={styles.timelineCueList}>
        {allCues.length &&
          allCues.map((cue: VTTCue) => (
            <div
              key={cue.id}
              className={getCueClasses(cue)}
              style={computeStyleForCue(cue)}
              onDoubleClick={() => handleDoubleClick(cue)}
              onMouseOver={() => handleMouseOver(cue)}
            >
              <span>{cue.text}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimelineCueList;
