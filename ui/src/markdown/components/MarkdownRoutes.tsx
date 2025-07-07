import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownTree } from '@/contracts/markdown';
import { NotFoundPage } from '@/site/components/NotFoundPage';

import { useMarkdown } from '../hooks/useMarkdown';
import { useGetMarkdownTree } from '../hooks/useMarkdownQueries';

import { MarkdownContent } from './MarkdownContent';

export const MarkdownRoutes = () => {
  const {
    state: { rootApiPath, singlePage },
  } = useMarkdown();
  const markdownTree = useGetMarkdownTree(rootApiPath);

  if (!markdownTree.children) return <></>;

  return (
    <Routes>
      {listMarkdownRoutes(markdownTree.children, singlePage)}
      <Route key='*' path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

const listMarkdownRoutes = (children: MarkdownTree[], singlePage: boolean) => {
  const routes: ReactElement[] = [];

  children.forEach((child) => {
    routes.push(
      <Route
        key={child.apiPath}
        path={child.uiPath}
        element={<MarkdownContent apiPath={child.apiPath} />}
      />,
    );
    if (!singlePage && child.children) {
      routes.push(...listMarkdownRoutes(child.children, false));
    }
  });

  return routes;
};
