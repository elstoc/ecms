import { NavigationMenu } from '@base-ui/react/navigation-menu';
import cn from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavMenu.module.css';

const { Item, Trigger, Content, Link: NavigationLink, Icon } = NavigationMenu;

type DescribedLink = {
  title: string;
  active?: boolean;
  href?: string;
};

export type NavItemProps = DescribedLink & {
  subItems?: DescribedLink[];
};

export const NavItem = ({ title, href, active = false, subItems }: NavItemProps) => {
  const activeStyle = active ? styles.Active : undefined;

  if (!subItems && href) {
    return (
      <Item>
        <MenuLink className={cn(styles.Trigger, activeStyle)} href={href}>
          {title}
        </MenuLink>
      </Item>
    );
  }

  if (subItems) {
    return (
      <Item>
        <Trigger className={cn(styles.Trigger, activeStyle)}>
          {title}
          <ExpandSubmenuIcon />
        </Trigger>
        <Content className={styles.Content}>
          <ul className={styles.SubMenuItemList}>
            {subItems.map((item) => (
              <li key={item.href}>
                <MenuLink
                  className={cn(styles.LinkCard, { [styles.Active]: item.active })}
                  href={item.href ?? ''}
                >
                  <span className={styles.LinkTitle}>{item.title}</span>
                </MenuLink>
              </li>
            ))}
          </ul>
        </Content>
      </Item>
    );
  }
};

type LinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

const MenuLink = ({ href, className, children }: LinkProps) => (
  <NavigationLink render={<Link to={href} />} className={className}>
    {children}
  </NavigationLink>
);

const ExpandSubmenuIcon = () => (
  <Icon className={styles.ExpandSubmenuIcon}>
    <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
      <path d='M1 3.5L5 7.5L9 3.5' stroke='currentcolor' strokeWidth='1.5' />
    </svg>
  </Icon>
);
