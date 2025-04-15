import { Route, Routes } from 'react-router';

import { VideoDbMetadata } from '@/contracts/site';
import { NotFoundPage } from '@/shared/components/NotFoundPage';
import { useTitle } from '@/shared/hooks';

import { VideoDbContext, useVideoDbReducer } from '../hooks/useVideoDb';

import { VideoDbContent } from './VideoDbContent';

export const VideoDb = ({ title, apiPath }: VideoDbMetadata) => {
  const reducerProps = useVideoDbReducer(title, apiPath);

  useTitle(title);

  return (
    <VideoDbContext.Provider value={reducerProps}>
      <Routes>
        <Route path='update/:id' element={<VideoDbContent mode='update' />} />
        <Route path='add' element={<VideoDbContent mode='add' />} />
        <Route path='/' element={<VideoDbContent />} />
        <Route key='*' path='*' element={<NotFoundPage />} />
      </Routes>
    </VideoDbContext.Provider>
  );
};
