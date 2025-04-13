import { Suspense, lazy, useContext } from 'react';

import { MarkdownStateContext } from '../hooks/useMarkdown';

import './MarkdownEditPage.scss';

const EditMd = lazy(() => import('@/shared/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage = () => {
  const {
    state: { editedMarkdown },
    dispatch,
  } = useContext(MarkdownStateContext);

  const setEditedMarkdown = (value: string) => dispatch({ key: 'editedMarkdown', value });

  return (
    <Suspense>
      <div className='markdown-edit-page'>
        <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
      </div>
    </Suspense>
  );
};
