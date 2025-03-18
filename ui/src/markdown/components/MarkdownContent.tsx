import { Suspense, useContext } from 'react';
import { Card } from '@blueprintjs/core';

import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { ContentWithSidebar } from '../../shared/components/layout';
import { MarkdownNav } from './MarkdownNav';
import { MarkdownToolbox } from './MarkdownToolbox';
import { MarkdownPage } from './MarkdownPage';

import './MarkdownContent.scss';

type MarkdownContentProps = { apiPath: string };

export const MarkdownContent = ({ apiPath }: MarkdownContentProps) => {
  const {
    markdownState: { singlePage },
  } = useContext(MarkdownStateContext);

  const toolbar = <MarkdownToolbox apiPath={apiPath} />;

  const sidebar = (
    <Suspense>
      <MarkdownNav />
    </Suspense>
  );

  const content = (
    <Card className='markdown-page-content'>
      <Suspense>
        <MarkdownPage apiPath={apiPath} />
      </Suspense>
    </Card>
  );

  return (
    <ContentWithSidebar
      content={content}
      sidebar={singlePage ? null : sidebar}
      toolbarIcons={toolbar}
      closeSidebarOnClick={true}
    />
  );
};
