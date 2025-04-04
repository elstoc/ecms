import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { VideoWithId } from '@/contracts/videodb';

import { usePostVideo } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { EditVideoForm } from './EditVideoForm';

const initialVideo = {
  id: 0,
  title: '',
  category: '',
  director: null,
  num_episodes: null,
  length_mins: null,
  watched: '',
  priority_flag: null,
  progress: null,
  imdb_id: null,
  image_url: null,
  year: null,
  actors: null,
  plot: null,
  tags: null,
  primary_media_type: null,
  primary_media_location: null,
  primary_media_watched: null,
  other_media_type: null,
  other_media_location: null,
  media_notes: null,
};

export const AddVideo = () => {
  const navigate = useNavigate();
  const {
    videoDbState: { apiPath },
  } = useContext(VideoDbStateContext);

  const { mutate } = usePostVideo(apiPath, 'saved');

  const addVideo = async (video: VideoWithId) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...videoWithoutId } = video;
    mutate(videoWithoutId, { onSuccess: () => navigate(-1) });
  };

  return <EditVideoForm initialVideoState={initialVideo} onSave={addVideo} />;
};
