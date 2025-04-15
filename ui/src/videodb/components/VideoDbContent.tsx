import { Suspense } from 'react';

import { ContentWithSidebar } from '@/shared/components/layout';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';

import { AddOrUpdateVideo } from './AddOrUpdateVideo';
import { VideoFilters } from './VideoFilters';
import { VideoList } from './VideoList';
import { VideoToolbox } from './VideoToolbox';

import './VideoDbContent.scss';

type VideoDbContentProps = { mode?: 'update' | 'add' };

export const VideoDbContent = ({ mode }: VideoDbContentProps) => {
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
      <AddOrUpdateVideo mode={mode} />
    </div>
  );
};
