import { useContext } from 'react';

import { useTitle } from '@/shared/hooks';

import { GalleryStateContext } from '../hooks/useGalleryState';

import { GalleryLightBox } from './GalleryLightBox';
import { GalleryToolbox } from './GalleryToolbox';
import { JustifiedGallery } from './JustifiedGallery';

import './GalleryContent.scss';

export const GalleryContent = () => {
  const {
    galleryState: { title },
  } = useContext(GalleryStateContext);
  useTitle(title);

  return (
    <div className='gallery-content'>
      <GalleryToolbox />
      <GalleryLightBox />
      <JustifiedGallery />
    </div>
  );
};
