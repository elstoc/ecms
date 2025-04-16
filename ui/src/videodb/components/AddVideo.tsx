import { useNavigate } from 'react-router-dom';

import { VideoWithId } from '@/contracts/videodb';

import { usePostVideo } from '../hooks/useVideoDbQueries';

import { EditVideoForm } from './EditVideoForm';

const initialVideo = {
  id: 0,
  title: '',
  category: '',
  watched: '',
};

export const AddVideo = () => {
  const navigate = useNavigate();
  const { mutate } = usePostVideo('saved');

  const addVideo = async (video: VideoWithId) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...videoWithoutId } = video;
    mutate(videoWithoutId, { onSuccess: () => navigate(-1) });
  };

  return <EditVideoForm initialVideoState={initialVideo} onSave={addVideo} />;
};
