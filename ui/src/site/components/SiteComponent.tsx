import { CalibreDb } from '@/calibredb/components/CalibreDb';
import { ComponentMetadata, ComponentTypes } from '@/contracts/site';
import { Gallery } from '@/gallery';
import { Markdown } from '@/markdown';
import { VideoDb } from '@/videodb';

type SiteComponentProps = { metadata: ComponentMetadata };

export const SiteComponent = ({ metadata }: SiteComponentProps) => {
  if (metadata.type === ComponentTypes.gallery) {
    return <Gallery {...metadata} />;
  }
  if (metadata.type === ComponentTypes.markdown) {
    return <Markdown {...metadata} />;
  }
  if (metadata.type === ComponentTypes.videodb) {
    return <VideoDb {...metadata} />;
  }
  if (metadata.type === ComponentTypes.calibredb) {
    return <CalibreDb {...metadata} />;
  }

  return <div>Component Type Not Supported</div>;
};
