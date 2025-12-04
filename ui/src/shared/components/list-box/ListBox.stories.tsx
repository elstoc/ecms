import { Meta, StoryObj } from '@storybook/react-webpack5';

import { ListBox } from './ListBox';
import { ListBoxItem } from './ListBoxItem';

const meta = {
  title: 'ListBox',
  component: ListBox,
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

const children = (
  <>
    <ListBoxItem>Zero</ListBoxItem>
    <ListBoxItem>One</ListBoxItem>
    <ListBoxItem>Two</ListBoxItem>
    <ListBoxItem>Three</ListBoxItem>
    <ListBoxItem>Four</ListBoxItem>
    <ListBoxItem>Five</ListBoxItem>
  </>
);

export const Default: Story = {
  args: {
    children,
  },
};
