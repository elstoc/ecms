import { Suspense } from 'react';
import { useParams } from 'react-router';

import { NotFoundPage } from '@/shared/components/NotFoundPage';
import { ContentWithSidebar } from '@/shared/components/layout';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';

import { EditVideoDialog } from './EditVideoDialog';
import { VideoFilters } from './VideoFilters';
import { VideoList } from './VideoList';
import { VideoToolbox } from './VideoToolbox';

import './VideoDbContent.scss';

export const VideoDbContent = () => {
  const { mode, id } = useParams();

  if (
    (mode && !['add', 'update'].includes(mode)) ||
    (mode === 'update' && !Number.isInteger(parseInt(id ?? '')))
  ) {
    return <NotFoundPage />;
  }

  const content = (
    <Suspense>
      <VideoList />
    </Suspense>
  );

  const sidebar = (
    <Suspense>
      <VideoFilters />
    </Suspense>
  );

  return (
    <div className='video-content'>
      <InjectComponentTools>
        <VideoToolbox />
      </InjectComponentTools>
      <ContentWithSidebar content={content} sidebar={sidebar} />
      <EditVideoDialog />
    </div>
  );
};
