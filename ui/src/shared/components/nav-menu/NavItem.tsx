import { NavigationMenu } from '@base-ui/react/navigation-menu';
import cn from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavMenu.module.css';

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
      <NavigationMenu.Item>
        <MenuLink className={cn(styles.Trigger, activeStyle)} href={href}>
          {title}
        </MenuLink>
      </NavigationMenu.Item>
    );
  }

  if (subItems) {
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className={cn(styles.Trigger, activeStyle)}>
          {title}
          <NavigationMenu.Icon className={styles.Icon}>
            <ChevronDownIcon />
          </NavigationMenu.Icon>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.Content}>
          <ul className={styles.FlexLinkList}>
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
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    );
  }
};

type LinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

const MenuLink = ({ href, className, children }: LinkProps) => (
  <NavigationMenu.Link render={<Link to={href} />} className={className}>
    {children}
  </NavigationMenu.Link>
);

const ChevronDownIcon = () => (
  <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
    <path d='M1 3.5L5 7.5L9 3.5' stroke='currentcolor' strokeWidth='1.5' />
  </svg>
);
