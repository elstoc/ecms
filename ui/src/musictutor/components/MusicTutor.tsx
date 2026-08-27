import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { Flute } from './Flute';
import { StaffRender } from './StaffRender';

import * as styles from './MusicTutor.module.css';

const tune = 'L: 1/4\n' + "F,E''";

export const MusicTutor = () => {
  return (
    <ContentWithSidebar sidebar={null}>
      <div className={styles.Root}>
        <StaffRender tune={tune} />
        <Flute />
      </div>
    </ContentWithSidebar>
  );
};
