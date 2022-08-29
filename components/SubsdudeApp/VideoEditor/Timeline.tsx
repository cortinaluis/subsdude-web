import React, {
  createRef,
  MouseEvent,
  useCallback,
  useEffect,
  useState
} from 'react';

import { useVideoEditorContext } from '../../../context/videoEditor';
import styles from '../../../styles/Timeline.module.scss';

const Timeline = () => {
  const contentRef = createRef<HTMLDivElement>();

  const {
    videoCurrentTime,
    videoDuration,
    setIsPlaying,
    setVideoSelectedTime
  } = useVideoEditorContext();

  const [cursorHoverPosition, setCursorHoverPosition]
        = useState<number>(0);
  const [cursorTimePosition, setCursorTimePosition]
        = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [containerWidthPercentage, setContainerWidthPercentage]
        = useState<number>(100);

  const calculateProgressPercentage = (
    absoluteCursorPosition: number,
    containerWidth: number
  ): number => {
    const percentage = (absoluteCursorPosition * 100) / containerWidth;
    return Math.round((percentage + Number.EPSILON) * 100) / 100;
  };

  const calculateProgressPosition = useCallback((
    containerWidth: number
  ): number => {
    const elapsedPercentage = (videoCurrentTime * 100) / videoDuration;
    const newPosition = (containerWidth / 100) * elapsedPercentage;
    if (isNaN(newPosition)) {
      return 0;
    }
    return Math.round(newPosition);
  }, [videoCurrentTime, videoDuration]);

  const handleMouseMove = (event: MouseEvent) => {
    if (contentRef.current !== null) {
      const { left } = contentRef.current.getBoundingClientRect();
      setCursorHoverPosition(event.clientX - left);

      if (event.buttons > 0) {
        handleClick(event);
      }
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (contentRef.current !== null) {
      const { left, width } = contentRef.current.getBoundingClientRect();
      const newTimePosition = event.clientX - left;
      setCursorTimePosition(newTimePosition);

      const newVideoSelectedTime
          = Math.round((
            videoDuration * calculateProgressPercentage(newTimePosition, width)
          ) / 100);
      setVideoSelectedTime(newVideoSelectedTime);
      setIsPlaying(false);
    }
  };

  const handleZoom = (operation: '+' | '-') => {
    let newZoomLevel;
    if (operation === '+') {
      newZoomLevel = zoomLevel + 1;
    } else {
      newZoomLevel = zoomLevel - 1;
    }

    if (newZoomLevel <= 0) {
      newZoomLevel = 1;
    }

    setZoomLevel(newZoomLevel);
    setContainerWidthPercentage(100 * newZoomLevel);
  };

  useEffect(() => {
    if (contentRef.current !== null) {
      const { width } = contentRef.current.getBoundingClientRect();
      setCursorTimePosition(calculateProgressPosition(width));
    }
  }, [calculateProgressPosition, contentRef, videoCurrentTime]);

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineWrapper}>
        <div
          ref={contentRef}
          className={styles.timelineContent}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{ width: `${containerWidthPercentage}%` }}
        >
          <div
            className={styles.hoverCursor}
            style={{ left: cursorHoverPosition }}
          />
          <div
            className={styles.cursor}
            style={{ left: cursorTimePosition }}
          />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1, right: 1 }}>
        <button onClick={() => handleZoom('+')}>+</button>
        <button onClick={() => handleZoom('-')}>-</button>
      </div>
    </div>
  );
};


export default Timeline;