import { useState } from 'react';

import { Disclosure, DisclosurePanel } from '@/shared/components/disclosure';
import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';

import { ContentWithSideBarProps } from './ContentWithSidebar';
import { Layout } from './Layout';

import * as styles from './CWSSinglePanel.module.css';

export const CWSSinglePanel = ({
  children,
  sidebar,
  closeSidebarOnClick,
  componentTools,
}: ContentWithSideBarProps) => {
  const [sidebarDrawerVisible, setSidebarDrawerVisible] = useState(false);

  const sideExpander = sidebar ? (
    <Toolbox>
      <IconButton
        icon='menu'
        label={sidebarDrawerVisible ? 'collapse menu' : 'expand menu'}
        className='sidebar-button'
        onClick={() => setSidebarDrawerVisible((visible) => !visible)}
      />
    </Toolbox>
  ) : null;

  return (
    <Layout headerToolsLeft={componentTools} headerToolsRight={sideExpander}>
      <div className={styles.Root}>
        {sidebar && (
          <Disclosure open={sidebarDrawerVisible}>
            <DisclosurePanel>
              <div
                className={styles.Sidebar}
                onClick={() => closeSidebarOnClick && setSidebarDrawerVisible(false)}
              >
                {sidebar}
              </div>
            </DisclosurePanel>
          </Disclosure>
        )}
        <div className={styles.Content}>{children}</div>
      </div>
    </Layout>
  );
};
