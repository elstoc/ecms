import { Meta, StoryObj } from '@storybook/react-webpack5';

import { NavMenu } from './NavMenu';

const meta = {
  title: 'NavMenu',
  component: NavMenu,
} satisfies Meta<typeof NavMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <NavMenu {...args} />;
  },
};
