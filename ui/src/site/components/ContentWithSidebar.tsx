import { ReactNode, useEffect, useState } from 'react';

import { Disclosure, DisclosurePanel } from '@/shared/components/disclosure';
import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';
import { useIsDualPanel } from '@/shared/hooks';

import { Layout } from './Layout';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
  children: ReactNode;
  sidebar: ReactNode;
  closeSidebarOnClick?: boolean;
  componentTools?: ReactNode;
};

export const ContentWithSidebar = ({
  children,
  sidebar,
  closeSidebarOnClick,
  componentTools,
}: ContentWithSideBarProps) => {
  const isDualPanel = useIsDualPanel();
  const [sidebarDrawerVisible, setSidebarDrawerVisible] = useState(false);

  useEffect(() => {
    if (isDualPanel) setSidebarDrawerVisible(false);
  }, [isDualPanel]);

  let sidebarElement = <div className='cws-sidebar'>{sidebar}</div>;
  let sideExpander = <></>;

  if (!isDualPanel && sidebar) {
    sidebarElement = (
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
    );

    sideExpander = (
      <Toolbox>
        <IconButton
          icon='menu'
          label={sidebarDrawerVisible ? 'collapse menu' : 'expand menu'}
          className='sidebar-button'
          onClick={() => setSidebarDrawerVisible((visible) => !visible)}
        />
      </Toolbox>
    );
  }

  return (
    <Layout headerToolsLeft={componentTools} headerToolsRight={sideExpander}>
      <div className='cws-container'>
        <div className={sidebar ? 'cws' : 'cws no-sidebar'}>
          <div className='cws-content-and-sidebar'>
            {sidebar && sidebarElement}
            <div className='cws-content'>{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
