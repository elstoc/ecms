import { MarkdownMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';

import { MarkdownContext, useMarkdownReducer } from '../hooks/useMarkdown';

import { MarkdownRoutes } from './MarkdownRoutes';

export const Markdown = ({ uiPath, apiPath, title, singlePage }: MarkdownMetadata) => {
  const { state, dispatch } = useMarkdownReducer(uiPath, apiPath, singlePage);
  useTitle(title);

  return (
    <MarkdownContext.Provider value={{ state, dispatch }}>
      <MarkdownRoutes />
    </MarkdownContext.Provider>
  );
};
