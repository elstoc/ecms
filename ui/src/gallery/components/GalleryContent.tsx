import { useContext } from 'react';

import { useTitle } from '@/shared/hooks';

import { JustifiedGallery } from './JustifiedGallery';
import { GalleryLightBox } from './GalleryLightBox';
import { GalleryStateContext } from '../hooks/useGalleryState';

import './GalleryContent.scss';

export const GalleryContent = () => {
  const {
    galleryState: { title },
  } = useContext(GalleryStateContext);
  useTitle(title);

  return (
    <div className='gallery-content'>
      <GalleryLightBox />
      <JustifiedGallery />
    </div>
  );
};
