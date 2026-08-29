import cn from 'classnames';
import { useState } from 'react';

import { Button } from '@/shared/components/button';

import { Flute } from './Flute';
import { FLUTE_FINGERING, FLUTE_NOTES_ABC_SHARP_ONLY } from './FluteNotes';
import { NoteRender } from './NoteRender';

import * as styles from './FluteFlashcard.module.css';

const getNote = () =>
  FLUTE_NOTES_ABC_SHARP_ONLY[Math.floor(Math.random() * FLUTE_NOTES_ABC_SHARP_ONLY.length)];

export const FluteFlashcard = () => {
  const initialNote = getNote();

  const [props, setProps] = useState({ note: initialNote, hideFingering: true });

  const handleButtonClick = () =>
    setProps((prevProps) => ({
      hideFingering: !prevProps.hideFingering,
      note: prevProps.hideFingering ? prevProps.note : getNote(),
    }));

  return (
    <div className={styles.Root}>
      <div className={styles.NoteAndFingering} key={props.note}>
        <div>
          <NoteRender note={props.note} />
        </div>
        <div className={cn(styles.Fingering, { [styles.Hidden]: props.hideFingering })}>
          <Flute keysPressed={FLUTE_FINGERING[props.note]} />
        </div>
      </div>
      <Button onClick={handleButtonClick}>
        {props.hideFingering ? 'Reveal Fingering' : 'New Note'}
      </Button>
    </div>
  );
};
