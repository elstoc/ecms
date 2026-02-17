import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: 'Button text',
    onClick: fn(),
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ClearFormatting: Story = {
  ...Default,
  args: {
    ...Default.args,
    clearFormatting: true,
  },
};
