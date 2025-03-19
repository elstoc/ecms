import { ComponentMetadata, ComponentTypes } from '@/contracts/site';

import { Gallery } from '@/gallery';
import { Markdown } from '@/markdown';
import { VideoDb } from '@/videodb';

type SiteComponentProps = { metadata: ComponentMetadata };

export const SiteComponent = ({ metadata }: SiteComponentProps) => {
  if (metadata.type === ComponentTypes.gallery) {
    return <Gallery key={metadata.apiPath} {...metadata} />;
  } else if (metadata.type === ComponentTypes.markdown) {
    return <Markdown key={metadata.apiPath} {...metadata} />;
  } else if (metadata.type === ComponentTypes.videodb) {
    return <VideoDb key={metadata.apiPath} {...metadata} />;
  }

  return <div>Component Type Not Supported</div>;
};
