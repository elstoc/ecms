import { ReactNode, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import YAML from 'yaml';

import { useTitle } from '@/shared/hooks';
import { splitFrontMatter } from '@/utils';

import { useMarkdown } from '../hooks/useMarkdown';

import './MarkdownViewPage.scss';

const RenderMd = lazy(() => import('@/shared/components/rendermd/RenderMdAsDefault'));

const basename = (path: string): string => {
  return path.split('/').reverse()[0];
};

export const MarkdownViewPage = () => {
  const {
    state: { currentPage, pageApiPath },
  } = useMarkdown();

  const [yaml, markdown] = splitFrontMatter(currentPage?.content || '');
  const pageTitle = YAML.parse(yaml)?.title || basename(pageApiPath) || 'Home';
  useTitle(pageTitle);

  const renderLink = (href: string, children: ReactNode & ReactNode[]) => {
    return (
      <Link to={href.replace(/\/$/, '')} relative='path'>
        {children}
      </Link>
    );
  };

  return (
    <Suspense>
      <div className='markdown-view-page'>
        <RenderMd pageTitle={pageTitle} markdown={markdown} renderLink={renderLink} />
      </div>
    </Suspense>
  );
};
