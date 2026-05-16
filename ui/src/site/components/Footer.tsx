import { useSiteConfig } from '../hooks/useSiteQueries';

import * as styles from './Footer.module.css';

export const Footer = () => {
  const siteConfig = useSiteConfig();
  return <div className={styles.Root}>{siteConfig?.footerText}</div>;
};
