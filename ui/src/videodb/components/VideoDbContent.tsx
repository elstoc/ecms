import { useParams } from 'react-router';

import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';
import { NotFoundPage } from '@/site/components/NotFoundPage';

import { EditVideo } from './EditVideo';
import { VideoFilters } from './VideoFilters';
import { VideoList } from './VideoList';
import { VideoTools } from './VideoTools';

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
      <ContentWithSidebar componentTools={<VideoTools />} sidebar={<VideoFilters />}>
        <VideoList />
      </ContentWithSidebar>
      <EditVideo />
    </>
  );
};
