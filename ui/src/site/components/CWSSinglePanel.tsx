import { useState } from 'react';

import { Disclosure, DisclosurePanel } from '@/shared/components/disclosure';
import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';

import { ContentWithSideBarProps } from './ContentWithSidebar';
import { Layout } from './Layout';

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
      <div className='cws-container'>
        <div className={sidebar ? 'cws' : 'cws no-sidebar'}>
          <div className='cws-content-and-sidebar'>
            {sidebar && (
              <Disclosure open={sidebarDrawerVisible}>
                <DisclosurePanel>
                  <div
                    className='cws-sidebar'
                    onClick={() => closeSidebarOnClick && setSidebarDrawerVisible(false)}
                  >
                    {sidebar}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            )}
            <div className='cws-content'>{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
