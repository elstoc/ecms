import { NavigationMenu } from '@base-ui/react/navigation-menu';
import cn from 'classnames';
import { ReactNode } from 'react';
import { Link as ReactDomLink } from 'react-router-dom';

import styles from './NavItem.module.css';

const { Item, Trigger, Content, Link, Icon } = NavigationMenu;

type DescribedLink = {
  title: string;
  active?: boolean;
  href?: string;
};

export type NavItemProps = DescribedLink & {
  subItems?: DescribedLink[];
};

export const NavItem = ({ title, href, active = false, subItems }: NavItemProps) => {
  const styleIfActive = active ? styles.ActiveLink : undefined;

  if (!subItems && href) {
    return (
      <Item>
        <NavMenuLink className={cn(styles.Trigger, styleIfActive)} href={href}>
          {title}
        </NavMenuLink>
      </Item>
    );
  }

  if (subItems) {
    return (
      <Item>
        <Trigger className={cn(styles.Trigger, styleIfActive)}>
          {title}

          <ExpandSubmenuIcon />
        </Trigger>
        <Content className={styles.SubMenuContent}>
          <ul className={styles.SubMenuItemList}>
            {subItems.map((item) => (
              <li key={item.href}>
                <NavMenuLink
                  className={cn(styles.LinkCard, { [styles.ActiveLink]: item.active })}
                  href={item.href ?? ''}
                >
                  <span className={styles.LinkTitle}>{item.title}</span>
                </NavMenuLink>
              </li>
            ))}
          </ul>
        </Content>
      </Item>
    );
  }
};

type NavMenuLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

const NavMenuLink = ({ href, className, children }: NavMenuLinkProps) => (
  <Link render={<ReactDomLink to={href} />} className={className} closeOnClick>
    {children}
  </Link>
);

const ExpandSubmenuIcon = () => (
  <Icon className={styles.ExpandSubmenuIcon}>
    <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
      <path d='M1 3.5L5 7.5L9 3.5' stroke='currentcolor' strokeWidth='1.5' />
    </svg>
  </Icon>
);
