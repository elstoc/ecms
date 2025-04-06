import { useCustomQuery } from '@/shared/hooks';

import { getGalleryContents } from '../api';

import { useGallery } from './useGallery';

export const useGalleryContent = () => {
  const {
    state: { apiPath, pages, initialImage, sortOrder, shuffleSeed },
  } = useGallery();

  // initialImage is not present in the key to avoid unnecessary reload
  return useCustomQuery({
    queryKey: ['galleryContents', apiPath, pages, sortOrder, shuffleSeed ?? 0],
    queryFn: () => getGalleryContents(apiPath, pages, initialImage, sortOrder, shuffleSeed),
  });
};
