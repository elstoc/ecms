import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetMarkdownPage } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { MarkdownViewPage } from './MarkdownViewPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownAddPage } from './MarkdownAddPage';

type MarkdownAddPageProps = { apiPath: string };

export const MarkdownPage = ({ apiPath }: MarkdownAddPageProps) => {
  const { markdownReducer } = useContext(MarkdownStateContext);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const mdPage = useGetMarkdownPage(apiPath);

  useEffect(() => {
    const pageDetails = {
      currentPage: mdPage,
      editedMarkdown: mdPage.content,
      pageApiPath: apiPath,
    };
    markdownReducer({ key: 'currentPageDetails', value: pageDetails });
  }, [markdownReducer, mdPage, apiPath]);

  return (
    <>
      {mode === 'edit' ? <MarkdownEditPage /> : <MarkdownViewPage />}
      <MarkdownAddPage />
    </>
  );
};
