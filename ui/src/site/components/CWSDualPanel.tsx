import cn from 'classnames';

import { Toolbar } from '@/shared/components/toolbar';

import { ContentWithSideBarProps } from './ContentWithSidebar';
import { Layout } from './Layout';

import * as styles from './CWSDualPanel.module.scss';

export const CWSDualPanel = ({ children, sidebar, componentTools }: ContentWithSideBarProps) => (
  <Layout headerToolsLeft={componentTools ? <Toolbar.Root>{componentTools}</Toolbar.Root> : null}>
    <div className={styles.Root}>
      <div className={cn(styles.CWS, { [styles.NoSidebar]: !sidebar })}>
        {sidebar && <div className={styles.Sidebar}>{sidebar}</div>}

        <div className={styles.Content}>{children}</div>
      </div>
    </div>
  </Layout>
);
