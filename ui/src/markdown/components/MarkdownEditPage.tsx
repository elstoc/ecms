import { Suspense, lazy } from 'react';

import { useMarkdown } from '../hooks/useMarkdown';

const EditMd = lazy(() => import('@/shared/components/editmd/EditMdAsDefault'));

export const MarkdownEditPage = () => {
  const {
    state: { editedMarkdown },
    dispatch,
  } = useMarkdown();

  const setEditedMarkdown = (payload: string) => dispatch({ type: 'setEditedMarkdown', payload });

  return (
    <Suspense>
      <EditMd markdown={editedMarkdown} setMarkdown={setEditedMarkdown} />
    </Suspense>
  );
};
