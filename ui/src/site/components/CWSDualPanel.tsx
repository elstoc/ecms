import { ContentWithSideBarProps } from './ContentWithSidebar';
import { Layout } from './Layout';

export const CWSDualPanel = ({ children, sidebar, componentTools }: ContentWithSideBarProps) => (
  <Layout headerToolsLeft={componentTools}>
    <div className='cws-container'>
      <div className={sidebar ? 'cws' : 'cws no-sidebar'}>
        <div className='cws-content-and-sidebar'>
          {sidebar && <div className='cws-sidebar'>{sidebar}</div>}
          <div className='cws-content'>{children}</div>
        </div>
      </div>
    </div>
  </Layout>
);
