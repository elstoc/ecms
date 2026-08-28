import { useState } from 'react';

import { Select } from '@/shared/components/select';
import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { FluteFingeringChart } from './FluteFingeringChart';
import { FluteFlashcard } from './FluteFlashcard';
import { PianoKeys } from './PianoKeys';

import * as styles from './MusicTutor.module.css';

export const MusicTutor = () => {
  const [mode, setMode] = useState('fluteFingering');

  const items = [
    { value: 'fluteFingering', label: 'Flute Fingering' },
    { value: 'fluteFlashcard', label: 'Flute Flash Cards' },
    { value: 'piano', label: 'Piano' },
  ];

  return (
    <ContentWithSidebar sidebar={null}>
      <div className={styles.Root}>
        <Select
          label='Mode'
          items={items}
          value={mode}
          onChange={(newValue) => setMode(newValue || '')}
          width='lg'
        />
        {mode === 'fluteFingering' && <FluteFingeringChart />}
        {mode === 'fluteFlashcard' && <FluteFlashcard />}
        {mode === 'piano' && <PianoKeys />}
      </div>
    </ContentWithSidebar>
  );
};
