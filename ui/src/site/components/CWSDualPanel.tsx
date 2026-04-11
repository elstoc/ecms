import cn from 'classnames';

import { ContentWithSideBarProps } from './ContentWithSidebar';
import { Layout } from './Layout';

export const CWSDualPanel = ({ children, sidebar, componentTools }: ContentWithSideBarProps) => (
  <Layout headerToolsLeft={componentTools}>
    <div className='cws-root'>
      <div className={cn('cws', { 'no-sidebar': !sidebar })}>
        {sidebar && <div className='cws-sidebar'>{sidebar}</div>}
        <div className='cws-content'>{children}</div>
      </div>
    </div>
  </Layout>
);
