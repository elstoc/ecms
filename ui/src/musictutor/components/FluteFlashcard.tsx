import cn from 'classnames';
import { useState } from 'react';
import * as Tone from 'tone';

import { Button } from '@/shared/components/button';
import { getRandomArrayElementFn } from '@/utils/getRandomArrayElementFn';

import { Flute } from './Flute';
import { FLUTE_FINGERING, FLUTE_NOTES_ABC_SHARP_ONLY } from './FluteNotes';
import { NoteRender } from './NoteRender';
import { getPitch } from './abcToPitchNotation';

import * as styles from './FluteFlashcard.module.css';

const getNote = getRandomArrayElementFn(FLUTE_NOTES_ABC_SHARP_ONLY, 10, 5);
const synth = new Tone.Synth().toDestination();

export const FluteFlashcard = () => {
  const initialNote = getNote();

  const [props, setProps] = useState({ note: initialNote, hideFingering: true });

  const handleButtonClick = () => {
    if (!props.hideFingering) {
      const newNote = getNote();
      const pitch = getPitch(newNote);

      setProps({ note: newNote, hideFingering: true });
      synth.triggerAttackRelease(pitch, '8n');
    } else {
      const pitch = getPitch(props.note);
      synth.triggerAttackRelease(pitch, '8n');
      setProps((prevProps) => ({ note: prevProps.note, hideFingering: false }));
    }
  };

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
