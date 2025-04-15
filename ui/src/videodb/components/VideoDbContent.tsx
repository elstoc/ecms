import { AddOrUpdateVideo } from './AddOrUpdateVideo';
import { VideoList } from './VideoList';

import './VideoDbContent.scss';

type VideoDbContentProps = { mode?: 'update' | 'add' };

export const VideoDbContent = ({ mode }: VideoDbContentProps) => {
  return (
    <div className='video-content'>
      <AddOrUpdateVideo mode={mode} />
      <VideoList />
    </div>
  );
};
