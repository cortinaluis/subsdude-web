import React, { createRef, useCallback, useEffect } from 'react';

import { useSubtitleContext } from '../../../../context/subtitle';
import { useVideoEditorContext } from '../../../../context/videoEditor';
import { logSetupComplete } from '../../../../helpers/helpers';

const SubtitleTrack = () => {
  const { setAllCues, setActiveCues } = useSubtitleContext();
  const { videoMeta } = useVideoEditorContext();

  // I really tried not to use ref here... but the <track> el seems very limited
  // event-wise
  const trackElementRef = createRef<HTMLTrackElement>();

  const handleOnLoad = useCallback(() => {
    if (trackElementRef.current !== null) {
      const { track } = trackElementRef.current;

      if (track.cues !== null) {
        track.oncuechange = (event: Event): void => {
          const target = event.target as TextTrack;
          if (target !== null && target.activeCues !== null) {
            setActiveCues([...Object.values(target.activeCues)] as VTTCue[]);
          }
        };

        setAllCues(Object.values(track.cues) as VTTCue[]);
      }
    }
  }, [setActiveCues, setAllCues, trackElementRef]);


  useEffect(() => {
    if (trackElementRef.current !== null) {
      trackElementRef.current.addEventListener('load', handleOnLoad);
      logSetupComplete('<SubtitleTrack/>');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <track src={videoMeta?.subtitleSrc} default ref={trackElementRef}/>
  );
};

export default SubtitleTrack;