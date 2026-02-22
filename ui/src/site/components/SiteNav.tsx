import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { ComponentMetadata, ComponentTypes } from '@/contracts/site';
import { Classes, Popover } from '@/shared/components-legacy/popover';

import { isNavActive } from '../utils/isNavActive';

import './SiteNav.scss';

type SiteNavProps = { siteComponents: ComponentMetadata[] };

export const SiteNav = ({ siteComponents }: SiteNavProps) => {
  if (siteComponents.length === 1) {
    return <></>;
  }

  return (
    <nav className='site-nav'>
      {siteComponents.map((component) => (
        <ComponentNavItem key={component.apiPath} component={component} />
      ))}
    </nav>
  );
};

type ComponentNavItemProps = { component: ComponentMetadata };

const ComponentNavItem = ({ component }: ComponentNavItemProps) => {
  const { pathname } = useLocation();

  const navTitleClasses = cn('nav-title', { active: isNavActive(pathname, component.uiPath) });

  if (component.type !== ComponentTypes.componentgroup) {
    return (
      <Link to={component.uiPath}>
        <div className={navTitleClasses}>{component.title}</div>
      </Link>
    );
  }

  const subMenuElement = (
    <div className='sub-menu'>
      {component.components.map((subComponent) => (
        <ComponentNavItem key={subComponent.apiPath} component={subComponent} />
      ))}
    </div>
  );

  return (
    <Popover
      content={subMenuElement}
      placement='bottom-start'
      popoverClassName={Classes.POPOVER_DISMISS}
      interactionKind='click'
      minimal={true}
      modifiers={{ offset: { enabled: true, options: { offset: [0, 6] } } }}
    >
      <div className={navTitleClasses}>{component.title}</div>
    </Popover>
  );
};
