import { useTitle } from '@/shared/hooks';
import { Layout } from '@/site/components/Layout';

import { useGallery } from '../hooks/useGallery';

import { GalleryLightBox } from './GalleryLightBox';
import { GalleryToolbox } from './GalleryToolbox';
import { JustifiedGallery } from './JustifiedGallery';

import * as styles from './GalleryContent.module.css';

export const GalleryContent = () => {
  const {
    state: { title },
  } = useGallery();

  useTitle(title);

  return (
    <Layout headerToolsLeft={<GalleryToolbox />}>
      <div className={styles.Root}>
        <GalleryLightBox />
        <JustifiedGallery />
      </div>
    </Layout>
  );
};
