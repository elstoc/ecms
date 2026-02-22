import { Meta, StoryObj } from '@storybook/react-webpack5';

import { NavItemProps } from './NavItem';
import { NavMenu } from './NavMenu';

const items: NavItemProps[] = [
  {
    title: 'Overview',
    active: true,
    subItems: [
      {
        href: '/react/overview/quick-start',
        title: 'Quick Start',
        active: true,
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
    ],
  },
  {
    title: 'Handbook',
    subItems: [
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
    ],
  },
  {
    title: 'Github',
    href: 'https://github.com/mui/base-ui',
  },
];

const meta = {
  title: 'NavMenu',
  component: NavMenu,
} satisfies Meta<typeof NavMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items,
  },
  render: (args) => {
    return <NavMenu {...args} />;
  },
};
