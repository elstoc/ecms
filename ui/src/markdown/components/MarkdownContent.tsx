import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';
import { Layout } from '@/site/components/Layout';

import { useMarkdown } from '../hooks/useMarkdown';

import { MarkdownNav } from './MarkdownNav';
import { MarkdownPage } from './MarkdownPage';
import { MarkdownToolbox } from './MarkdownToolbox';

import './MarkdownContent.css';

type MarkdownContentProps = { apiPath: string };

export const MarkdownContent = ({ apiPath }: MarkdownContentProps) => {
  const {
    state: { singlePage },
  } = useMarkdown();

  const content = (
    <div className='markdown-page-content'>
      <MarkdownPage apiPath={apiPath} />
      <InjectComponentTools>
        <MarkdownToolbox apiPath={apiPath} />
      </InjectComponentTools>
    </div>
  );

  return (
    <Layout>
      <ContentWithSidebar
        content={content}
        sidebar={singlePage ? null : <MarkdownNav />}
        closeSidebarOnClick={true}
      />
    </Layout>
  );
};
