import { useNavigate, useParams } from 'react-router-dom';

import { VideoWithId } from '@/contracts/videodb';
import { NotFoundPage } from '@/shared/components/NotFoundPage';

import { useVideoDb } from '../hooks/useVideoDb';
import { useDeleteVideo, useGetVideo, usePutVideo } from '../hooks/useVideoDbQueries';

import { EditVideoForm } from './EditVideoForm';

export const UpdateVideo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    state: { apiPath },
  } = useVideoDb();

  const idInt = parseInt(id || 'x');
  if (!Number.isInteger(idInt)) {
    return <NotFoundPage />;
  }

  const storedVideo = useGetVideo(apiPath, idInt);
  const { mutate: deleteMutate } = useDeleteVideo(apiPath, idInt, 'deleted');
  const { mutate: putMutate } = usePutVideo(apiPath, idInt, 'saved');

  const putVideo = async (video: VideoWithId) =>
    putMutate(video, { onSuccess: () => navigate(-1) });

  const deleteVideo = async () => deleteMutate(undefined, { onSuccess: () => navigate(-1) });

  return <EditVideoForm initialVideoState={storedVideo} onSave={putVideo} onDelete={deleteVideo} />;
};
