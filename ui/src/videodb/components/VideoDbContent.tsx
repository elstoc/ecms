import { Dialog, DialogBody } from '@blueprintjs/core';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { NotFoundPage } from '@/shared/components/NotFoundPage';

import { AddVideo } from './AddVideo';
import { UpdateVideo } from './UpdateVideo';
import { VideoList } from './VideoList';

import './VideoDbContent.scss';

type VideoDbContentProps = { mode?: 'update' | 'add' };

export const VideoDbContent = ({ mode }: VideoDbContentProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userIsAdmin = useGetUserIsAdmin();

  if (mode === 'update' && !Number.isInteger(parseInt(id || 'x'))) {
    return <NotFoundPage />;
  }

  return (
    <div className='video-content'>
      {userIsAdmin && (
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
              {mode === 'update' && <UpdateVideo id={parseInt(id ?? '0')} />}
            </Suspense>
          </DialogBody>
        </Dialog>
      )}
      <VideoList />
    </div>
  );
};
