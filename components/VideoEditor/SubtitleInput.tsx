import styles from '../../styles/SubtitleInput.module.scss';
import { ChangeEvent } from 'react';

type Props = {
    activeCues: VTTCue[] | null;
    onInputChange: (cueId: string, value: string) => void;
}

const SubtitleInput = ({ onInputChange, activeCues }: Props) => {
  const handleInputChange = (
    cueId: string,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = (event.target as HTMLInputElement);
    onInputChange(cueId, value);
  };

  return (
    <>
      {
        (activeCues === null || !activeCues.length) &&
              <input
                type="text"
                className={styles.subtitleInput}
                placeholder="no subtitle segment in timeframe..."
              />
      }
      {
        activeCues !== null && activeCues.map((cue) => (
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
    </>
  );
};

export default SubtitleInput;