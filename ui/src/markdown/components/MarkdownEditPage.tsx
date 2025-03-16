/* eslint-disable no-restricted-globals */
import { FC, ReactElement, Suspense, useContext, lazy } from 'react';

import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import './MarkdownEditPage.scss';

const EditMd = lazy(() => import('../../shared/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage: FC = (): ReactElement => {
    const { markdownState: { editedMarkdown }, markdownReducer} = useContext(MarkdownStateContext);

    const setEditedMarkdown = (value: string) => markdownReducer({ key: 'editedMarkdown', value });

    return (
        <Suspense>
            <div className='markdown-edit-page'>
                <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
            </div>
        </Suspense>
    );
};
