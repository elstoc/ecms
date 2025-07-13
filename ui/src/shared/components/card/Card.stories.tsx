import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Card } from './Card';

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lorum Ipsem',
  },
};

export const Highlight: Story = {
  args: {
    ...Default.args,
    highlight: true,
  },
};

export const AsButton: Story = {
  args: {
    ...Default.args,
    onClick: fn(),
  },
};
