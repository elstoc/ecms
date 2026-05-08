import { MarkdownMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';

import { MarkdownContext, useMarkdownReducer } from '../hooks/useMarkdown';

import { MarkdownContent } from './MarkdownContent';

export const Markdown = ({ uiPath, apiPath, title, singlePage }: MarkdownMetadata) => {
  const { state, dispatch } = useMarkdownReducer(uiPath, apiPath, singlePage);
  useTitle(title);

  return (
    <MarkdownContext value={{ state, dispatch }}>
      <MarkdownContent />
    </MarkdownContext>
  );
};
