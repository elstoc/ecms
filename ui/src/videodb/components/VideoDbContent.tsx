import { useParams } from 'react-router';

import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';
import { NotFoundPage } from '@/site/components/NotFoundPage';

import { EditVideo } from './EditVideo';
import { VideoFilters } from './VideoFilters';
import { VideoList } from './VideoList';
import { VideoToolbox } from './VideoToolbox';

export const VideoDbContent = () => {
  const { mode, id } = useParams();

  if (
    (mode && !['add', 'update'].includes(mode)) ||
    (mode === 'update' && !Number.isInteger(parseInt(id ?? '')))
  ) {
    return <NotFoundPage />;
  }

  return (
    <>
      <InjectComponentTools>
        <VideoToolbox />
      </InjectComponentTools>
      <ContentWithSidebar sidebar={<VideoFilters />}>
        <VideoList />
      </ContentWithSidebar>
      <EditVideo />
    </>
  );
};
