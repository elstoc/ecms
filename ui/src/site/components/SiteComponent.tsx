import { CalibreDb } from '@/calibredb/components/CalibreDb';
import { ComponentMetadata, ComponentTypes } from '@/contracts/site';
import { Gallery } from '@/gallery';
import { Markdown } from '@/markdown';
import { MusicTutor } from '@/musictutor/components/MusicTutor';
import { VideoDb } from '@/videodb';

type SiteComponentProps = { metadata: ComponentMetadata };

export const SiteComponent = ({ metadata }: SiteComponentProps) => {
  if (metadata.type === ComponentTypes.gallery) {
    return <Gallery key={metadata.apiPath} {...metadata} />;
  }
  if (metadata.type === ComponentTypes.markdown) {
    return <Markdown key={metadata.apiPath} {...metadata} />;
  }
  if (metadata.type === ComponentTypes.videodb) {
    return <VideoDb key={metadata.apiPath} {...metadata} />;
  }
  if (metadata.type === ComponentTypes.calibredb) {
    return <CalibreDb key={metadata.apiPath} {...metadata} />;
  }
  if (metadata.type === ComponentTypes.musictutor) {
    return <MusicTutor />;
  }

  return <div>Component Type Not Supported</div>;
};
