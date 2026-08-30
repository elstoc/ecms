import { FLUTE_FINGERING, FLUTE_NOTES_ABC_SHARP_ONLY } from '../utils/fluteNotes';

import { AbcNoteRender } from './AbcNoteRender';
import { Flute } from './Flute';

import * as styles from './FluteFingeringChart.module.css';

export const FluteFingeringChart = () => {
  return (
    <div className={styles.Root}>
      {FLUTE_NOTES_ABC_SHARP_ONLY.map((note) => (
        <div className={styles.Fingering} key={note}>
          <AbcNoteRender abcNote={note} />
          <Flute keysPressed={FLUTE_FINGERING[note]} />
        </div>
      ))}
    </div>
  );
};
