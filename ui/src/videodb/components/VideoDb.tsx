import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { VideoDbMetadata } from '@/contracts/site';
import { NotFoundPage } from '@/shared/components/NotFoundPage';
import { ContentWithSidebar } from '@/shared/components/layout';
import { useTitle } from '@/shared/hooks';

import { VideoDbStateContext, useVideoDbState } from '../hooks/useVideoDbStateContext';

import { VideoDbContent } from './VideoDbContent';
import { VideoFilters } from './VideoFilters';
import { VideoToolbox } from './VideoToolbox';

export const VideoDb = ({ title, apiPath }: VideoDbMetadata) => {
  const videoDbState = useVideoDbState(title, apiPath);

  useTitle(title);

  const toolbar = (
    <Suspense>
      <VideoToolbox />
    </Suspense>
  );

  const filters = (
    <Suspense>
      <VideoFilters />
    </Suspense>
  );

  const content = (
    <Suspense>
      <Routes>
        <Route path='update/:id' element={<VideoDbContent mode='update' />} />
        <Route path='add' element={<VideoDbContent mode='add' />} />
        <Route path='/' element={<VideoDbContent />} />
        <Route key='*' path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );

  // suspense is wrapped around routes and page elements separately to stop screen flashing
  return (
    <VideoDbStateContext.Provider value={videoDbState}>
      <Suspense>
        <ContentWithSidebar content={content} sidebar={filters} toolbarIcons={toolbar} />
      </Suspense>
    </VideoDbStateContext.Provider>
  );
};
