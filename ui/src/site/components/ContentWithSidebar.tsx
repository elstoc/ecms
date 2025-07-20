import { Collapse } from '@blueprintjs/core';
import { ReactNode, useEffect, useState } from 'react';

import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';
import { useIsDualPanel } from '@/shared/hooks';
import { InjectSideExpander } from '@/site/components/HeaderToolbox';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
  content: ReactNode;
  sidebar: ReactNode;
  closeSidebarOnClick?: boolean;
};

export const ContentWithSidebar = ({
  content,
  sidebar,
  closeSidebarOnClick,
}: ContentWithSideBarProps) => {
  const isDualPanel = useIsDualPanel();
  const [sidebarDrawerVisible, setSidebarDrawerVisible] = useState(false);

  useEffect(() => {
    if (isDualPanel) setSidebarDrawerVisible(false);
  }, [isDualPanel]);

  let sidebarElement = <div className='cws-sidebar'>{sidebar}</div>;

  if (!isDualPanel && sidebar) {
    sidebarElement = (
      <Collapse isOpen={sidebarDrawerVisible} keepChildrenMounted={true}>
        <div
          className='cws-sidebar'
          onClick={() => closeSidebarOnClick && setSidebarDrawerVisible(false)}
        >
          {sidebar}
        </div>
      </Collapse>
    );
  }

  return (
    <div className='cws-container'>
      <div className={sidebar ? 'cws' : 'cws no-sidebar'}>
        <div className='cws-content-and-sidebar'>
          {!isDualPanel && sidebar && (
            <InjectSideExpander>
              <Toolbox>
                <Icon
                  name='menu'
                  label={sidebarDrawerVisible ? 'collapse menu' : 'expand menu'}
                  className='sidebar-button'
                  onClick={() => setSidebarDrawerVisible((visible) => !visible)}
                />
              </Toolbox>
            </InjectSideExpander>
          )}
          {sidebar && sidebarElement}
          <div className='cws-content'>{content}</div>
        </div>
      </div>
    </div>
  );
};
