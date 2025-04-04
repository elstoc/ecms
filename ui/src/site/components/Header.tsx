import { Suspense } from 'react';

import { UserInfo } from '@/auth';

import { useSiteComponents, useSiteConfig } from '../hooks/useSiteQueries';

import { SiteNav } from './SiteNav';

import './Header.scss';

export const Header = () => {
  const siteComponents = useSiteComponents();
  const { siteTitle } = useSiteConfig();

  return (
    <Suspense>
      <div className='header'>
        <div className='left'>
          {siteTitle && <div className='site-title'>{siteTitle}</div>}
          <SiteNav siteComponents={siteComponents} />
        </div>
        <div className='toolbar'>
          <UserInfo />
          <div id='component-toolbox'></div>
        </div>
      </div>
    </Suspense>
  );
};
