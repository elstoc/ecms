import { useNavigate } from 'react-router-dom';

import { VideoWithId } from '@/contracts/videodb';

import { EMPTY_VIDEO, useGetVideo, usePostVideo } from '../hooks/useVideoDbQueries';

import { EditVideoForm } from './EditVideoForm';

export const AddVideo = () => {
  const navigate = useNavigate();
  const video = useGetVideo(EMPTY_VIDEO);
  const { mutate } = usePostVideo('saved');

  const addVideo = async (video: VideoWithId) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...videoWithoutId } = video;
    mutate(videoWithoutId, { onSuccess: () => navigate(-1) });
  };

  return <EditVideoForm initialVideoState={video} onSave={addVideo} />;
};
