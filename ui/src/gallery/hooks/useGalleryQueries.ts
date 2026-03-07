import { ImageMetadata } from '@/contracts/gallery';
import { useCustomQuery } from '@/shared/hooks';

import { getGalleryContents } from '../api';

import { useGallery } from './useGallery';

const noImages: ImageMetadata[] = [];

export const useGalleryContent = () => {
  const {
    state: { apiPath, pages, initialImage, sortOrder, shuffleSeed },
  } = useGallery();

  // initialImage is not present in the key to avoid unnecessary reload
  const galleryContents = useCustomQuery({
    queryKey: ['galleryContents', apiPath, pages, sortOrder, shuffleSeed ?? 0],
    queryFn: () => getGalleryContents(apiPath, pages, initialImage, sortOrder, shuffleSeed),
  });

  if (galleryContents) {
    return galleryContents;
  }

  return {
    images: noImages,
    currentPage: 1,
    totalPages: 1,
  };
};
