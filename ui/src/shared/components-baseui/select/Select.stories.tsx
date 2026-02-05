import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Select } from './Select';
import { SelectItem } from './SelectItem';

const twentyNumbers = [...Array(20).keys()];

const items = twentyNumbers.map((number) => ({ label: `Item #${number}`, value: `item${number}` }));

const meta = {
  title: 'BaseUI/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Item',
    items: items,
    children: 'something',
  },
  render: (args) => {
    return (
      <Select {...args}>
        {items.map(({ label, value }) => (
          <SelectItem key={value} label={label} value={value} />
        ))}
      </Select>
    );
  },
};
