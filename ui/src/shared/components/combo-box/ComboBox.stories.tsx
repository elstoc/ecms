import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ListBoxItem } from 'react-aria-components';

import { ComboBox } from './ComboBox';

const meta = {
  title: 'ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

const children = (
  <>
    <ListBoxItem className='ecms-item'>Zero</ListBoxItem>
    <ListBoxItem className='ecms-item'>One</ListBoxItem>
    <ListBoxItem className='ecms-item'>Two</ListBoxItem>
    <ListBoxItem className='ecms-item'>Three</ListBoxItem>
    <ListBoxItem className='ecms-item'>Four</ListBoxItem>
    <ListBoxItem className='ecms-item'>Five</ListBoxItem>
    <ListBoxItem className='ecms-item'>Six</ListBoxItem>
    <ListBoxItem className='ecms-item'>Seven</ListBoxItem>
    <ListBoxItem className='ecms-item'>Eight</ListBoxItem>
    <ListBoxItem className='ecms-item'>Nine</ListBoxItem>
    <ListBoxItem className='ecms-item'>Ten</ListBoxItem>
  </>
);

export const Default: Story = {
  args: {
    label: 'Field label',
    children,
  },
};
