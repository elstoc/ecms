import { useNavigate } from 'react-router-dom';

import { useDeleteVideo, useGetVideo, usePutVideo } from '../hooks/useVideoDbQueries';

import { EditVideoForm } from './EditVideoForm';

type UpdateVideoProps = { id: number };

export const UpdateVideo = ({ id }: UpdateVideoProps) => {
  const navigate = useNavigate();
  const storedVideo = useGetVideo(id);
  const { mutate: deleteMutate } = useDeleteVideo('deleted');
  const { mutate: putMutate } = usePutVideo('saved');

  const onSuccess = () => navigate(-1);

  return (
    <EditVideoForm
      initialVideoState={storedVideo}
      onSave={async (video) => putMutate(video, { onSuccess })}
      onDelete={async () => deleteMutate(id, { onSuccess })}
    />
  );
};
