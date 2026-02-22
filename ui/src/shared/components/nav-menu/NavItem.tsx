import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavMenu.module.css';

type DescribedLink = {
  title: string;
  href?: string;
};

export type NavItemProps = {
  title: string;
  href?: string;
  subItems?: DescribedLink[];
};

export const NavItem = ({ title, href, subItems }: NavItemProps) => {
  if (!subItems && href) {
    return (
      <NavigationMenu.Item>
        <Link className={styles.Trigger} href={href}>
          {title}
        </Link>
      </NavigationMenu.Item>
    );
  }

  if (subItems) {
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className={styles.Trigger}>
          {title}
          <NavigationMenu.Icon className={styles.Icon}>
            <ChevronDownIcon />
          </NavigationMenu.Icon>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.Content}>
          <ul className={styles.FlexLinkList}>
            {subItems.map((item) => (
              <li key={item.href}>
                <Link className={styles.LinkCard} href={item.href ?? ''}>
                  <h3 className={styles.LinkTitle}>{item.title}</h3>
                </Link>
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

const Link = ({ href, className, children }: LinkProps) => (
  <NavigationMenu.Link render={<NavLink to={href} />} className={className}>
    {children}
  </NavigationMenu.Link>
);

const ChevronDownIcon = () => (
  <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
    <path d='M1 3.5L5 7.5L9 3.5' stroke='currentcolor' strokeWidth='1.5' />
  </svg>
);
