import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MarkdownTree } from '@/contracts/markdown';
import { NotFoundPage } from '@/site/components/NotFoundPage';

import { useMarkdown } from '../hooks/useMarkdown';
import { useGetMarkdownTree } from '../hooks/useMarkdownQueries';

import { MarkdownPage } from './MarkdownPage';

export const MarkdownPageRoutes = () => {
  const {
    state: { rootApiPath, singlePage },
  } = useMarkdown();

  const { children } = useGetMarkdownTree(rootApiPath);

  if (!children) return <></>;

  return (
    <Routes>
      {listMarkdownPageRoutes(children, singlePage)}
      <Route key='*' path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

const listMarkdownPageRoutes = (children: MarkdownTree[], singlePage: boolean) => {
  const routes: ReactElement[] = [];

  children.forEach((child) => {
    routes.push(
      <Route
        key={child.apiPath}
        path={child.uiPath}
        element={<MarkdownPage apiPath={child.apiPath} />}
      />,
    );
    if (!singlePage && child.children) {
      routes.push(...listMarkdownPageRoutes(child.children, false));
    }
  });

  return routes;
};
