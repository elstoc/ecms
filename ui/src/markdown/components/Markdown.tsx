import { MarkdownMetadata } from '../../contracts/site';
import { useTitle } from '../../shared/hooks';

import { MarkdownStateContext, useMarkdownState } from '../hooks/useMarkdownStateContext';
import { MarkdownRoutes } from './MarkdownRoutes';

export const Markdown = ({ uiPath, apiPath, title, singlePage }: MarkdownMetadata) => {
    const { markdownState, markdownReducer } = useMarkdownState(uiPath, apiPath, singlePage);
    useTitle(title);

    return (
        <MarkdownStateContext.Provider value={{ markdownState, markdownReducer}}>
            <MarkdownRoutes />
        </MarkdownStateContext.Provider>
    );
};
