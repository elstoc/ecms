import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { VideoWithId } from '@/contracts/videodb';

import { useDeleteVideo, useGetVideo, usePutVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { EditVideoForm } from './EditVideoForm';

type UpdateVideoProps = { id: number };

export const UpdateVideo = ({ id }: UpdateVideoProps) => {
  const navigate = useNavigate();
  const {
    videoDbState: { apiPath },
  } = useContext(VideoDbStateContext);

  const storedVideo = useGetVideo(apiPath, id);
  const { mutate: deleteMutate } = useDeleteVideo(apiPath, id, 'deleted');
  const { mutate: putMutate } = usePutVideo(apiPath, id, 'saved');

  const putVideo = async (video: VideoWithId) =>
    putMutate(video, { onSuccess: () => navigate(-1) });

  const deleteVideo = async () => deleteMutate(undefined, { onSuccess: () => navigate(-1) });

  return <EditVideoForm initialVideoState={storedVideo} onSave={putVideo} onDelete={deleteVideo} />;
};
