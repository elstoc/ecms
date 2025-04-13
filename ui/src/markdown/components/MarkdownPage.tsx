import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MarkdownStateContext } from '../hooks/useMarkdown';
import { useGetMarkdownPage } from '../hooks/useMarkdownQueries';

import { MarkdownAddPage } from './MarkdownAddPage';
import { MarkdownEditPage } from './MarkdownEditPage';
import { MarkdownViewPage } from './MarkdownViewPage';

type MarkdownAddPageProps = { apiPath: string };

export const MarkdownPage = ({ apiPath }: MarkdownAddPageProps) => {
  const { dispatch } = useContext(MarkdownStateContext);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const mdPage = useGetMarkdownPage(apiPath);

  useEffect(() => {
    const pageDetails = {
      currentPage: mdPage,
      editedMarkdown: mdPage.content,
      pageApiPath: apiPath,
    };
    dispatch({ key: 'currentPageDetails', value: pageDetails });
  }, [dispatch, mdPage, apiPath]);

  return (
    <>
      {mode === 'edit' ? <MarkdownEditPage /> : <MarkdownViewPage />}
      <MarkdownAddPage />
    </>
  );
};
