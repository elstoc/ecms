import { useLocation } from 'react-router-dom';

import { ComponentMetadata, ComponentTypes } from '@/contracts/site';
import { NavMenu } from '@/shared/components/nav-menu';
import { NavItemProps } from '@/shared/components/nav-menu/NavItem';

import { isNavActive } from '../utils/isNavActive';

type SiteNavProps = { siteComponents: ComponentMetadata[] };

export const SiteNav = ({ siteComponents }: SiteNavProps) => {
  const { pathname } = useLocation();

  if (siteComponents.length === 1) {
    return <></>;
  }

  const getLinkItem = (title: string, uiPath: string) => ({
    title,
    href: uiPath,
    active: isNavActive(pathname, uiPath),
  });

  const navItems: NavItemProps[] = siteComponents.map((component) => {
    if (component.type === ComponentTypes.componentgroup) {
      return {
        title: component.title,
        active: isNavActive(pathname, component.uiPath),
        subItems: component.components.map((subComponent) =>
          getLinkItem(subComponent.title, subComponent.uiPath),
        ),
      };
    }

    return getLinkItem(component.title, component.uiPath);
  });

  return <NavMenu items={navItems} />;
};
