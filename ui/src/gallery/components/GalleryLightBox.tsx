import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LightBox } from '@/shared/components/lightbox';
import { useTitle } from '@/shared/hooks';

import { useGallery } from '../hooks/useGallery';
import { useGalleryContent } from '../hooks/useGalleryQueries';

export const GalleryLightBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { title },
  } = useGallery();
  const { images } = useGalleryContent();

  const imageName = searchParams.get('image');
  const imageIndex = images.findIndex((image) => image.fileName === imageName);

  useEffect(() => {
    if (images && imageName && imageIndex < 0) {
      // requested LightBox image does not exist
      setSearchParams({}, { replace: true });
    }
  }, [images, imageName, imageIndex]);

  useTitle(imageName ? `${title} - ${imageName}` : title);

  const currImage = images[imageIndex];
  const nextImage = images[imageIndex + 1];
  const prevImage = images[imageIndex - 1];

  return (
    currImage && (
      <LightBox
        onClose={() => setSearchParams({}, { replace: true })}
        onPrev={
          prevImage && (() => setSearchParams({ image: prevImage.fileName }, { replace: true }))
        }
        onNext={
          nextImage && (() => setSearchParams({ image: nextImage.fileName }, { replace: true }))
        }
        caption={currImage.description}
        alt={currImage.fileName}
        imageUrl={currImage.fhdSrcUrl}
        prevImageUrl={prevImage?.fhdSrcUrl}
        nextImageUrl={nextImage?.fhdSrcUrl}
      />
    )
  );
};
