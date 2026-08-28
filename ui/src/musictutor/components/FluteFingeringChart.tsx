import { Flute } from './Flute';
import { FLUTE_FINGERING, FLUTE_NOTES_ABC_SHARP_ONLY } from './FluteNotes';
import { NoteRender } from './NoteRender';

import * as styles from './FluteFingeringChart.module.css';

export const FluteFingeringChart = () => {
  return (
    <div className={styles.Root}>
      {FLUTE_NOTES_ABC_SHARP_ONLY.map((note) => (
        <div className={styles.Fingering} key={note}>
          <NoteRender note={note} />
          <Flute keysPressed={FLUTE_FINGERING[note]} />
        </div>
      ))}
    </div>
  );
};
