import { useTitle } from '@/shared/hooks';
import { Layout } from '@/site/components/Layout';

import { useGallery } from '../hooks/useGallery';

import { GalleryLightBox } from './GalleryLightBox';
import { GalleryToolbox } from './GalleryToolbox';
import { JustifiedGallery } from './JustifiedGallery';

import './GalleryContent.css';

export const GalleryContent = () => {
  const {
    state: { title },
  } = useGallery();

  useTitle(title);

  return (
    <Layout headerToolsLeft={<GalleryToolbox />}>
      <div className='gallery-content'>
        <GalleryLightBox />
        <JustifiedGallery />
      </div>
    </Layout>
  );
};
