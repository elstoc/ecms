import { Flute } from './Flute';
import { FLUTE_NOTES_ABC_SHARP_ONLY, FLUTE_NOTE_FINGERING } from './FluteNotes';
import { NoteRender } from './NoteRender';

import * as styles from './FluteFingeringChart.module.css';

export const FluteFingeringChart = () => {
  return (
    <div className={styles.Root}>
      {FLUTE_NOTES_ABC_SHARP_ONLY.map((note) => (
        <div className={styles.Fingering} key={note}>
          <NoteRender note={note} />
          <Flute keysPressed={FLUTE_NOTE_FINGERING[note]} />
        </div>
      ))}
    </div>
  );
};
