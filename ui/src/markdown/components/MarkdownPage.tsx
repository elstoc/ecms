import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMarkdown } from '../hooks/useMarkdown';
import { useGetMarkdownPage } from '../hooks/useMarkdownQueries';

import { MarkdownAddPage } from './MarkdownAddPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownViewPage } from './MarkdownViewPage';

type MarkdownAddPageProps = { apiPath: string };

export const MarkdownPage = ({ apiPath }: MarkdownAddPageProps) => {
  const { dispatch } = useMarkdown();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const mdPage = useGetMarkdownPage(apiPath);

  useEffect(() => {
    const payload = {
      currentPage: mdPage,
      editedMarkdown: mdPage.content,
      pageApiPath: apiPath,
    };
    dispatch({ type: 'setCurrentPageDetails', payload });
  }, [dispatch, mdPage, apiPath]);

  return (
    <>
      {mode === 'edit' ? <MarkdownEditPage /> : <MarkdownViewPage />}
      <MarkdownAddPage />
    </>
  );
};
