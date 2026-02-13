import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Combobox } from './Combobox';

const meta = {
  title: 'BaseUI/Combobox',
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: { type: 'string' },
  },
  args: {
    children: 'something',
  },
  render: () => {
    return <Combobox />;
  },
};
