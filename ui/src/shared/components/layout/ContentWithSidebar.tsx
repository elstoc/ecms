import { Collapse } from '@blueprintjs/core';
import { ReactElement, useEffect, useState } from 'react';

import { useIsDualPanel } from '@/shared/hooks';
import { InjectSideExpander } from '@/site/components/HeaderToolbox';

import { Icon } from '../icon';

import { Toolbox } from './Toolbox';

import './ContentWithSidebar.scss';

type ContentWithSideBarProps = {
  content: ReactElement;
  sidebar: ReactElement | null;
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
