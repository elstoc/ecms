import { useSiteComponents, useSiteConfig } from '../hooks/useSiteQueries';

import { HeaderToolbox } from './HeaderToolbox';
import { SiteNav } from './SiteNav';

import './Header.scss';

export const Header = () => {
  const siteComponents = useSiteComponents();
  const { siteTitle } = useSiteConfig() ?? {};

  if (!siteComponents) {
    return null;
  }

  return (
    <div className='header'>
      <div className='nav-and-title'>
        {siteTitle && <div className='site-title'>{siteTitle}</div>}
        <SiteNav siteComponents={siteComponents} />
      </div>
      <div className='toolbar'>
        <HeaderToolbox />
      </div>
    </div>
  );
};
