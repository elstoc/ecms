import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { Flute } from './Flute';
import { FLUTE_NOTES } from './FluteNotes';
import { NoteRender } from './NoteRender';

import * as styles from './MusicTutor.module.css';

export const MusicTutor = () => {
  return (
    <ContentWithSidebar sidebar={null}>
      <div className={styles.Root}>
        <NoteRender note='^C' />
        <Flute keysPressed={FLUTE_NOTES['^C']} />
      </div>
    </ContentWithSidebar>
  );
};
