import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { IconButton } from '../icon-button';

import { Separator, Toolbar } from './Toolbar';

const meta = {
  title: 'Toolbar',
  component: Toolbar,
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'anything',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string[]) => {
      updateArgs({ value: newValue });
    };

    return (
      <Toolbar orientation={args.orientation}>
        <IconButton icon='add' label='add' />
        <Separator />
        <IconButton icon='delete' label='delete' />
      </Toolbar>
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
