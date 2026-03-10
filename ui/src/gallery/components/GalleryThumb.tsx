import { Ref } from 'react';
import { Link } from 'react-router-dom';

import './GalleryThumb.css';

type GalleryThumbProps = {
  fileName: string;
  description: string;
  url: string;
  ref?: Ref<HTMLAnchorElement>;
};

export const GalleryThumb = ({ fileName, description, url, ref }: GalleryThumbProps) => (
  <Link to={`?image=${fileName}`} replace={true} className='gallery-thumb' ref={ref}>
    <img src={url} alt={fileName} />
    <div className='overlay'>{description}</div>
  </Link>
);
