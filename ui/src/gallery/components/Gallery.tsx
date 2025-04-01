import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { GalleryMetadata } from '@/contracts/site';
import { NotFoundPage } from '@/shared/components/NotFoundPage';

import { GalleryStateContext, useGalleryStateReducer } from '../hooks/useGalleryState';

import { GalleryContent } from './GalleryContent';

export const Gallery = (props: GalleryMetadata) => {
  const [searchParams] = useSearchParams();
  const initialImage = searchParams.get('image') ?? undefined;
  const { apiPath, title } = props;

  const { galleryState, galleryStateReducer } = useGalleryStateReducer({
    apiPath,
    title,
    pages: 1,
    initialImage,
    sortOrder: 'desc',
  });

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
