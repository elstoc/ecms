import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { FluteFingeringChart } from './FluteFingeringChart';

import * as styles from './MusicTutor.module.css';

export const MusicTutor = () => {
  return (
    <ContentWithSidebar sidebar={null}>
      <div className={styles.Root}>
        <FluteFingeringChart />
      </div>
    </ContentWithSidebar>
  );
};
