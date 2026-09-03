import cn from 'classnames';
import { useState } from 'react';
import * as Tone from 'tone';

import { Button } from '@/shared/components/button';
import { getRandomArrayElementFn } from '@/utils/getRandomArrayElementFn';

import { getPitch } from '../utils/abcToPitchNotation';
import { FLUTE_FINGERING, FLUTE_NOTES_ABC } from '../utils/fluteNotes';

import { AbcNoteRender } from './AbcNoteRender';
import { Flute } from './Flute';

import * as styles from './FluteFlashcard.module.css';

const getNote = getRandomArrayElementFn(FLUTE_NOTES_ABC, 10);
const synth = new Tone.Synth().toDestination();

type State = { note: string; hideFingering: boolean };

export const FluteFlashcard = () => {
  const [state, setState] = useState<State | undefined>();

  const handleButtonClick = () => {
    if (!state?.hideFingering) {
      const newNote = getNote();
      const pitch = getPitch(newNote);

      setState({ note: newNote, hideFingering: true });
      synth.triggerAttackRelease(pitch, '8n');
    } else {
      const pitch = getPitch(state.note);
      synth.triggerAttackRelease(pitch, '8n');
      setState((prevProps) => ({ note: prevProps?.note ?? 'c', hideFingering: false }));
    }
  };

  let buttonText = 'START';
  if (state) {
    buttonText = state.hideFingering ? 'Reveal Fingering' : 'New Note';
  }

  return (
    <div className={styles.Root}>
      <Button onClick={handleButtonClick}>{buttonText}</Button>
      <div className={styles.NoteAndFingering} key={state?.note ?? ''}>
        {state && (
          <>
            <div>
              <AbcNoteRender abcNote={state.note} />
            </div>
            <div className={cn(styles.Fingering, { [styles.Hidden]: state.hideFingering })}>
              <Flute keysPressed={FLUTE_FINGERING[state.note]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
