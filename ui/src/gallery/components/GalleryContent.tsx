import { useTitle } from '@/shared/hooks';
import { InjectComponentTools } from '@/site/components/HeaderToolbox';

import { useGallery } from '../hooks/useGallery';

import { GalleryLightBox } from './GalleryLightBox';
import { GalleryToolbox } from './GalleryToolbox';
import { JustifiedGallery } from './JustifiedGallery';

import './GalleryContent.scss';

export const GalleryContent = () => {
  const {
    state: { title },
  } = useGallery();

  useTitle(title);

  return (
    <div className='gallery-content'>
      <InjectComponentTools>
        <GalleryToolbox />
      </InjectComponentTools>
      <GalleryLightBox />
      <JustifiedGallery />
    </div>
  );
};
