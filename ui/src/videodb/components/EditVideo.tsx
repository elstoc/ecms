import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { Dialog, DialogBody } from '@/shared/components-legacy/dialog';

import {
  EMPTY_VIDEO_ID,
  useDeleteVideo,
  useGetVideo,
  usePostVideo,
  usePutVideo,
} from '../hooks/useVideoDbQueries';

import { EditVideoForm } from './EditVideoForm';

export const EditVideo = () => {
  const userIsAdmin = useUserIsAdmin();
  const navigate = useNavigate();

  const { mutate: deleteMutate } = useDeleteVideo('deleted');
  const { mutate: putMutate } = usePutVideo('saved');
  const { mutate: postMutate } = usePostVideo('saved');

  const { mode, id: idParam } = useParams();
  const id = mode === 'update' ? parseInt(idParam ?? '') : EMPTY_VIDEO_ID;

  const video = useGetVideo(id);

  if (!userIsAdmin) {
    return;
  }

  const onSuccess = () => navigate(-1);

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
          {mode === 'add' && (
            <EditVideoForm
              key='add'
              initialVideo={video}
              onSave={async (newVideo) => postMutate(newVideo, { onSuccess })}
            />
          )}
          {mode === 'update' && (
            <EditVideoForm
              key='update'
              initialVideo={video}
              onSave={async (updatedVideo) => putMutate({ id, ...updatedVideo }, { onSuccess })}
              onDelete={async () => deleteMutate(id, { onSuccess })}
            />
          )}
        </Suspense>
      </DialogBody>
    </Dialog>
  );
};
