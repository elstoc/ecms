import { useContext } from 'react';

import { useCustomQuery } from '@/shared/hooks';

import { getGalleryContents } from '../api';

import { GalleryStateContext } from './useGalleryState';

export const useGalleryContent = () => {
  const {
    galleryState: { apiPath, pages, initialImage, sortOrder, shuffleSeed },
  } = useContext(GalleryStateContext);

  // initialImage is not present in the key to avoid unnecessary reload
  return useCustomQuery({
    queryKey: ['galleryContents', apiPath, pages, sortOrder, shuffleSeed ?? 0],
    queryFn: () => getGalleryContents(apiPath, pages, initialImage, sortOrder, shuffleSeed),
  });
};
