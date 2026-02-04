import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { IconButton } from './IconButton';

const meta = {
  title: 'BaseUI/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'user',
    label: 'Some Title',
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
