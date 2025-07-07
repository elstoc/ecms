import { createRef, startTransition, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tesselate } from '@/shared/components/layout';
import { useElementIsVisible, useScrollIntoView } from '@/shared/hooks';

import { useGallery } from '../hooks/useGallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';

import { GalleryThumb } from './GalleryThumb';

export const JustifiedGallery = () => {
  const [searchParams] = useSearchParams();
  const { dispatch } = useGallery();
  const { images, totalPages, currentPage } = useGalleryContent();

  const loadMoreImages = useCallback(
    () =>
      startTransition(() => {
        dispatch({
          type: 'setPages',
          payload: Math.min(totalPages, currentPage + 1),
        });
      }),
    [currentPage, totalPages],
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
    [images, refActiveImage, refPenultimateImage],
  );

  return <Tesselate tiles={imageTiles} marginPx={3} />;
};
