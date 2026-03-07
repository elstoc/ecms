import { createRef, startTransition, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ImageMetadata } from '@/contracts/gallery';
import { Tesselate } from '@/shared/components/layout';
import { useElementIsVisible, useScrollIntoView } from '@/shared/hooks';

import { useGallery } from '../hooks/useGallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';

import { GalleryThumb } from './GalleryThumb';

const noImages: ImageMetadata[] = [];

export const JustifiedGallery = () => {
  const [searchParams] = useSearchParams();
  const { dispatch } = useGallery();

  const galleryContent = useGalleryContent();
  const images = galleryContent?.images ?? noImages;
  const totalPages = galleryContent?.totalPages ?? 1;
  const currentPage = galleryContent?.currentPage ?? 1;

  const loadMoreImages = useCallback(
    () =>
      startTransition(() => {
        dispatch({
          type: 'setPages',
          payload: Math.min(totalPages, currentPage + 1),
        });
      }),
    [currentPage, dispatch, totalPages],
  );

  const refPenultimateImage = createRef<HTMLAnchorElement>();
  useElementIsVisible(refPenultimateImage, loadMoreImages);

  const refActiveImage = createRef<HTMLAnchorElement>();
  useScrollIntoView(refActiveImage);

  const imageTiles = useMemo(
    () =>
      images.map((image, index) => {
        let ref = image.fileName === searchParams.get('image') ? refActiveImage : null;
        if (index === images.length - 2) ref = refPenultimateImage;

        const element = (
          <GalleryThumb
            key={`${image.fileName}${ref == null}`} // forces replacement and therefore unwatching of any previously-watched element
            fileName={image.fileName}
            description={image.description}
            url={image.thumbSrcUrl}
            ref={ref}
          />
        );

        return {
          element,
          key: image.fileName,
          maxHeight: image.thumbDimensions.height,
          maxWidth: image.thumbDimensions.width,
        };
      }),
    [images, refActiveImage, refPenultimateImage, searchParams],
  );

  return <Tesselate tiles={imageTiles} marginPx={3} />;
};
