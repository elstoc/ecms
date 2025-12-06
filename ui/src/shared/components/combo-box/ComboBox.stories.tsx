import { Meta, StoryObj } from '@storybook/react-webpack5';

import { ListBoxItem } from '../list-box';

import { ComboBox } from './ComboBox';

const meta = {
  title: 'ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

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
    <ListBoxItem>Six</ListBoxItem>
    <ListBoxItem>Seven</ListBoxItem>
    <ListBoxItem>Eight</ListBoxItem>
    <ListBoxItem>Nine</ListBoxItem>
    <ListBoxItem>Ten</ListBoxItem>
  </>
);

export const Default: Story = {
  argTypes: {
    children: { control: { disable: true } },
  },
  args: {
    label: 'Field label',
    children,
  },
};
