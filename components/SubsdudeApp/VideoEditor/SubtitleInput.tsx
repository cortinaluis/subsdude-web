import { ChangeEvent, useCallback } from 'react';

import { useSubtitleContext } from '../../../context/subtitle';
import styles from '../../../styles/SubtitleInput.module.scss';

const SubtitleInput = () => {
  const { activeCues, allCues } = useSubtitleContext();

  const handleInputChange = useCallback(
    (cueId: string, event: ChangeEvent<HTMLInputElement>) => {
      const { value } = (event.target as HTMLInputElement);
      allCues[Number(cueId) - 1].text = value;
    }, [allCues]);

  return !activeCues.length
    ?
    <input
      type="text"
      className={styles.subtitleInput}
      placeholder="no subtitle segment in timeframe..."
    />
    :
    <>
      {
        activeCues.map((cue) => (
          <input
            key={cue.id}
            type="text"
            className={styles.subtitleInput}
            onChange={(event, cueId = cue.id) =>
              handleInputChange(cueId, event)}
            defaultValue={cue.text}
          />
        ))
      }
    </>;
};

export default SubtitleInput;