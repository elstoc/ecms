import { Meta, StoryObj } from '@storybook/react-webpack5';

import { IconButton } from '../icon-button';

import { Toolbar } from './';

const meta = {
  title: 'Toolbar',
  component: Toolbar.Root,
} satisfies Meta<typeof Toolbar.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'anything',
  },
  render: (args) => {
    return (
      <Toolbar.Root orientation={args.orientation}>
        <IconButton icon='add' label='add' />
        <Toolbar.Separator />
        <IconButton icon='delete' label='delete' />
      </Toolbar.Root>
    );
  },
};

export const Vertical: Story = {
  ...Default,
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
};
