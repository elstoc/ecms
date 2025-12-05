import { Meta, StoryObj } from '@storybook/react-webpack5';
import { DialogTrigger } from 'react-aria-components';

import { Button } from '../button';

import { Popover } from './Popover';

const meta = {
  title: 'Popover',
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a popover',
  },
  render: (args) => {
    return (
      <DialogTrigger>
        <Button>Trigger</Button>
        <Popover {...args}>{args.children}</Popover>
      </DialogTrigger>
    );
  },
};
