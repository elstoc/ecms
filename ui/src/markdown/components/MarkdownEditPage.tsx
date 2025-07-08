import { Suspense, lazy } from 'react';

import { useMarkdown } from '../hooks/useMarkdown';

import './MarkdownEditPage.css';

const EditMd = lazy(() => import('@/shared/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage = () => {
  const {
    state: { editedMarkdown },
    dispatch,
  } = useMarkdown();

  const setEditedMarkdown = (payload: string) => dispatch({ type: 'setEditedMarkdown', payload });

  return (
    <Suspense>
      <div className='markdown-edit-page'>
        <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
      </div>
    </Suspense>
  );
};
