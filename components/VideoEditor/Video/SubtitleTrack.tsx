import React, { createRef, useCallback, useEffect } from 'react';

import { useSubtitleContext } from '../../../context/subtitle';
import { logSetupComplete } from '../../../helpers/helpers';

type Props = {
    src: string;
}
const SubtitleTrack = ({ src }: Props) => {
  const { setAllCues, setActiveCues } = useSubtitleContext();

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
  }, [handleOnLoad]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <track src={src} default ref={trackElementRef}/>
  );
};

export default SubtitleTrack;