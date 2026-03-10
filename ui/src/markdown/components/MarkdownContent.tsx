import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';

import { useMarkdown } from '../hooks/useMarkdown';

import { MarkdownNav } from './MarkdownNav';
import { MarkdownPageRoutes } from './MarkdownPageRoutes';
import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownContent.css';

export const MarkdownContent = () => {
  const {
    state: { singlePage },
  } = useMarkdown();

  const sidebar = singlePage ? null : <MarkdownNav />;

  return (
    <ContentWithSidebar sidebar={sidebar} closeSidebarOnClick={true}>
      <div className='markdown-page-content'>
        <MarkdownPageRoutes />
        <InjectComponentTools>
          <MarkdownToolbox />
        </InjectComponentTools>
      </div>
    </ContentWithSidebar>
  );
};
