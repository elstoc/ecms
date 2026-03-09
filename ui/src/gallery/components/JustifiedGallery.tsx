import { useMemo, useRef } from 'react';
import { useOnInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';

import { Tesselate } from '@/shared/components/layout';
import { useScrollIntoView } from '@/shared/hooks';

import { useGallery } from '../hooks/useGallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';

import { GalleryThumb } from './GalleryThumb';

export const JustifiedGallery = () => {
  const refActiveImage = useRef<HTMLAnchorElement>(null);
  const [searchParams] = useSearchParams();
  const { dispatch } = useGallery();

  const { images, totalPages, currentPage } = useGalleryContent();

  const refPenultimateImage = useOnInView((inView) => {
    if (inView) {
      dispatch({
        type: 'setPages',
        payload: Math.max(Math.min(totalPages, currentPage + 1), 1),
      });
    }
  });

  useScrollIntoView(refActiveImage);

  const imageTiles = useMemo(
    () =>
      images.map((image, index) => {
        const active = image.fileName === searchParams.get('image');
        const penultimate = index === images.length - 2;

        const element = (
          <GalleryThumb
            key={`${image.fileName}${active}${penultimate}`} // re-render if ref changes
            fileName={image.fileName}
            description={image.description}
            url={image.thumbSrcUrl}
            ref={penultimate ? refPenultimateImage : active ? refActiveImage : null}
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
