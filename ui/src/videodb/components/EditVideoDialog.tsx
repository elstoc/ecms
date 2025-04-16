import { Dialog, DialogBody } from '@blueprintjs/core';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { NotFoundPage } from '@/shared/components/NotFoundPage';

import { AddVideo } from './AddVideo';
import { UpdateVideo } from './UpdateVideo';

export const EditVideoDialog = () => {
  const { mode, id } = useParams();
  const userIsAdmin = useUserIsAdmin();
  const navigate = useNavigate();

  if (!userIsAdmin) {
    return;
  }

  if (mode === 'update' && !Number.isInteger(parseInt(id ?? ''))) {
    return <NotFoundPage />;
  }

  return (
    <Dialog
      title={mode === 'add' ? 'Add Video' : 'Update Video'}
      isOpen={mode === 'add' || mode === 'update'}
      onClose={() => navigate(-1)}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
    >
      <DialogBody useOverflowScrollContainer={false}>
        <Suspense>
          {mode === 'add' && <AddVideo />}
          {mode === 'update' && <UpdateVideo id={parseInt(id ?? '')} />}
        </Suspense>
      </DialogBody>
    </Dialog>
  );
};
