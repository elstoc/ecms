import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Rating } from './Rating';

const meta = {
  title: 'Rating',
  component: Rating,
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stars: 3,
  },
};
