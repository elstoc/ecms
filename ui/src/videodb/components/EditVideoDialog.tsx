import { Dialog, DialogBody } from '@blueprintjs/core';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { VideoWithId } from '@/contracts/videodb';

import {
  EMPTY_VIDEO,
  useDeleteVideo,
  useGetVideo,
  usePostVideo,
  usePutVideo,
} from '../hooks/useVideoDbQueries';

import { EditVideoForm } from './EditVideoForm';

export const EditVideoDialog = () => {
  const { mode, id } = useParams();
  const userIsAdmin = useUserIsAdmin();
  const navigate = useNavigate();

  const videoId = mode === 'update' ? parseInt(id ?? '') : EMPTY_VIDEO;
  const video = useGetVideo(videoId);

  const { mutate: deleteMutate } = useDeleteVideo('deleted');
  const { mutate: putMutate } = usePutVideo('saved');
  const { mutate: postMutate } = usePostVideo('saved');

  if (!userIsAdmin) {
    return;
  }

  const onSuccess = () => navigate(-1);

  const addVideo = async (video: VideoWithId) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...videoWithoutId } = video;
    postMutate(videoWithoutId, { onSuccess });
  };

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
            <EditVideoForm key='add' initialVideoState={video} onSave={addVideo} />
          )}
          {mode === 'update' && (
            <EditVideoForm
              key='update'
              initialVideoState={video}
              onSave={async (updatedVideo) => putMutate(updatedVideo, { onSuccess })}
              onDelete={async () => deleteMutate(videoId, { onSuccess })}
            />
          )}
        </Suspense>
      </DialogBody>
    </Dialog>
  );
};
