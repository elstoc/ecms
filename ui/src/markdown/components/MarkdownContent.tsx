import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { useMarkdown } from '../hooks/useMarkdown';

import { MarkdownNav } from './MarkdownNav';
import { MarkdownPageRoutes } from './MarkdownPageRoutes';
import { MarkdownTools } from './MarkdownTools';

import './MarkdownContent.css';

export const MarkdownContent = () => {
  const {
    state: { singlePage },
  } = useMarkdown();

  const sidebar = singlePage ? null : <MarkdownNav />;

  return (
    <ContentWithSidebar
      componentTools={<MarkdownTools />}
      sidebar={sidebar}
      closeSidebarOnClick={true}
    >
      <div className='markdown-page-content'>
        <MarkdownPageRoutes />
      </div>
    </ContentWithSidebar>
  );
};
