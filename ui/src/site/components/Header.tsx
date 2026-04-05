import { ReactNode } from 'react';

import { UserTools } from '@/auth';

import { useSiteComponents, useSiteConfig } from '../hooks/useSiteQueries';

import { SiteNav } from './SiteNav';

import './Header.scss';

type HeaderProps = {
  toolsLeft?: ReactNode;
  toolsRight?: ReactNode;
};

export const Header = ({ toolsLeft, toolsRight }: HeaderProps) => {
  const siteComponents = useSiteComponents() ?? [];
  const { siteTitle } = useSiteConfig() ?? {};

  return (
    <div className='header'>
      <div className='nav-and-title'>
        {siteTitle && <div className='site-title'>{siteTitle}</div>}
        <SiteNav siteComponents={siteComponents} />
      </div>

      <div className='toolbar'>
        <div className='left'>
          <div>{toolsRight}</div>
        </div>

        <div className='right'>
          <div>{toolsLeft}</div>
          <UserTools />
        </div>
      </div>
    </div>
  );
};
