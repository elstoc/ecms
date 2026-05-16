import { ReactNode } from 'react';

import { UserTools } from '@/auth';

import { useSiteComponents, useSiteConfig } from '../hooks/useSiteQueries';

import { SiteNav } from './SiteNav';

import * as styles from './Header.module.scss';

type HeaderProps = {
  toolsLeft?: ReactNode;
  toolsRight?: ReactNode;
};

export const Header = ({ toolsLeft, toolsRight }: HeaderProps) => {
  const siteComponents = useSiteComponents() ?? [];
  const { siteTitle } = useSiteConfig() ?? {};

  return (
    <div className={styles.Root}>
      <div className={styles.NavAndTitle}>
        {siteTitle && <div className={styles.Title}>{siteTitle}</div>}
        <SiteNav siteComponents={siteComponents} />
      </div>

      <div className={styles.Toolbar}>
        <div>
          <div>{toolsRight}</div>
        </div>

        <div className={styles.Right}>
          <div>{toolsLeft}</div>
          <UserTools />
        </div>
      </div>
    </div>
  );
};
