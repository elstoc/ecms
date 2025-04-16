import { Route, Routes } from 'react-router';

import { VideoDbMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';

import { VideoDbContext, useVideoDbReducer } from '../hooks/useVideoDb';

import { VideoDbContent } from './VideoDbContent';

export const VideoDb = ({ title, apiPath }: VideoDbMetadata) => {
  const reducerProps = useVideoDbReducer(title, apiPath);

  useTitle(title);

  return (
    <VideoDbContext.Provider value={reducerProps}>
      <Routes>
        <Route path=':mode?/:id?' element={<VideoDbContent />} />
      </Routes>
    </VideoDbContext.Provider>
  );
};
