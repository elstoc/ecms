import { Suspense } from 'react';

import { ContentWithSidebar } from '@/shared/components/layout';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';

import { useMarkdown } from '../hooks/useMarkdown';

import { MarkdownNav } from './MarkdownNav';
import { MarkdownPage } from './MarkdownPage';
import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownContent.scss';

type MarkdownContentProps = { apiPath: string };

export const MarkdownContent = ({ apiPath }: MarkdownContentProps) => {
  const {
    state: { singlePage },
  } = useMarkdown();

  const sidebar = (
    <Suspense>
      <MarkdownNav />
    </Suspense>
  );

  const content = (
    <div className='markdown-page-content'>
      <Suspense>
        <MarkdownPage apiPath={apiPath} />
        <InjectComponentTools>
          <MarkdownToolbox apiPath={apiPath} />
        </InjectComponentTools>
      </Suspense>
    </div>
  );

  return (
    <ContentWithSidebar
      content={content}
      sidebar={singlePage ? null : sidebar}
      closeSidebarOnClick={true}
    />
  );
};
