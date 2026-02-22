import { NavigationMenu } from '@base-ui/react/navigation-menu';

import { NavItem } from './NavItem';

import styles from './NavMenu.module.css';

export const NavMenu = () => {
  return (
    <NavigationMenu.Root className={styles.Root}>
      <NavigationMenu.List className={styles.List}>
        <NavItem title='Overview' subItems={overviewItems} />
        <NavItem title='Handbook' subItems={handbookItems} />
        <NavItem title='Github' href='https://github.com/mui/base-ui' />
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          className={styles.Positioner}
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: 'none' }}
        >
          <NavigationMenu.Popup className={styles.Popup}>
            <NavigationMenu.Arrow className={styles.Arrow}>
              <ArrowSvg />
            </NavigationMenu.Arrow>
            <NavigationMenu.Viewport className={styles.Viewport} />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
};

const ArrowSvg = () => (
  <svg width='20' height='10' viewBox='0 0 20 10' fill='none'>
    <path
      d='M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z'
      className={styles.ArrowFill}
    />
    <path
      d='M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z'
      className={styles.ArrowOuterStroke}
    />
    <path
      d='M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z'
      className={styles.ArrowInnerStroke}
    />
  </svg>
);

const overviewItems = [
  {
    href: '/react/overview/quick-start',
    title: 'Quick Start',
  },
  {
    href: '/react/overview/accessibility',
    title: 'Accessibility',
  },
  {
    href: '/react/overview/releases',
    title: 'Releases',
  },
  {
    href: '/react/overview/about',
    title: 'About',
  },
];

const handbookItems = [
  {
    href: '/react/handbook/styling',
    title: 'Styling',
  },
  {
    href: '/react/handbook/animation',
    title: 'Animation',
  },
  {
    href: '/react/handbook/composition',
    title: 'Composition',
  },
];
