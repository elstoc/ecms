import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { GalleryMetadata } from '@/contracts/site';
import { NotFoundPage } from '@/shared/components/NotFoundPage';

import {
  GalleryStateContext,
  getInitialState,
  useGalleryStateReducer,
} from '../hooks/useGalleryState';

import { GalleryContent } from './GalleryContent';

export const Gallery = (props: GalleryMetadata) => {
  const { apiPath, title } = props;
  const { galleryState, galleryStateReducer } = useGalleryStateReducer(
    getInitialState(apiPath, title),
  );

  return (
    <GalleryStateContext.Provider value={{ galleryState, galleryStateReducer }}>
      <Suspense>
        <Routes>
          <Route path='/' element={<GalleryContent />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </GalleryStateContext.Provider>
  );
};
