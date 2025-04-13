import { MarkdownMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';

import { MarkdownStateContext, useMarkdownReducer } from '../hooks/useMarkdown';

import { MarkdownRoutes } from './MarkdownRoutes';

export const Markdown = ({ uiPath, apiPath, title, singlePage }: MarkdownMetadata) => {
  const { state, dispatch } = useMarkdownReducer(uiPath, apiPath, singlePage);
  useTitle(title);

  return (
    <MarkdownStateContext.Provider value={{ state, dispatch }}>
      <MarkdownRoutes />
    </MarkdownStateContext.Provider>
  );
};
