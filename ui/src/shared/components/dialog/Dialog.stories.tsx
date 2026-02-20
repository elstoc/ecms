import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Button } from '../button';

import { Dialog } from './Dialog';

const meta = {
  title: 'Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => undefined,
    title: 'Some title',
    children: 'anything',
  },
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();

    const setOpen = (open: boolean) => {
      updateArgs({ open });
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog {...args} open={open} onOpenChange={setOpen}>
          Some stuff here
        </Dialog>
      </>
    );
  },
};
