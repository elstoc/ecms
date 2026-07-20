import { Ref } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './GalleryThumb.module.css';

type GalleryThumbProps = {
  fileName: string;
  description: string;
  url: string;
  ref?: Ref<HTMLAnchorElement>;
};

export const GalleryThumb = ({ fileName, description, url, ref }: GalleryThumbProps) => (
  <Link to={`?image=${fileName}`} className={styles.Root} ref={ref}>
    <img className={styles.Image} src={url} alt={fileName} />
    <div className={styles.Overlay}>{description}</div>
  </Link>
);
