import { useContext } from 'react';

import { useCustomQuery } from '@/shared/hooks';

import { getGalleryContents } from '../api';

import { GalleryStateContext } from './useGalleryState';

export const useGalleryContent = () => {
  const {
    galleryState: { apiPath, maxImages },
  } = useContext(GalleryStateContext);

  return useCustomQuery({
    queryKey: ['galleryContents', apiPath, maxImages],
    queryFn: () => getGalleryContents(apiPath, maxImages),
  });
};
