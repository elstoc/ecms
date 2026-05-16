import { useState } from 'react';

import { Disclosure, DisclosurePanel } from '@/shared/components/disclosure';
import { IconButton } from '@/shared/components/icon-button';
import { Toolbar } from '@/shared/components/toolbar';

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
    <Toolbar.Root>
      <IconButton
        icon='menu'
        label={sidebarDrawerVisible ? 'collapse menu' : 'expand menu'}
        className='sidebar-button'
        onClick={() => setSidebarDrawerVisible((visible) => !visible)}
      />
    </Toolbar.Root>
  ) : null;

  return (
    <Layout
      headerToolsRight={sideExpander}
      headerToolsLeft={componentTools ? <Toolbar.Root>{componentTools}</Toolbar.Root> : null}
    >
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
