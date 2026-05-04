import cn from 'classnames';

import { Toolbar } from '@/shared/components/toolbar';

import { ContentWithSideBarProps } from './ContentWithSidebar';
import { Layout } from './Layout';

import * as styles from './CWSDualPanel.module.scss';

export const CWSDualPanel = ({ children, sidebar, componentTools }: ContentWithSideBarProps) => (
  <Layout>
    <div className={styles.Root}>
      <div className={cn(styles.FixedWidthContent, { [styles.NoSidebar]: !sidebar })}>
        {componentTools && (
          <div className={styles.Tools}>
            <Toolbar.Root>{componentTools}</Toolbar.Root>
          </div>
        )}
        <div className={styles.CWS}>
          {sidebar && <div className={styles.Sidebar}>{sidebar}</div>}

          <div className={styles.Content}>{children}</div>
        </div>
      </div>
    </div>
  </Layout>
);
