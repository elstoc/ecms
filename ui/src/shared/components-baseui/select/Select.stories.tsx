import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Select } from './Select';
import { SelectItem } from './SelectItem';

const apples = [
  { label: 'Gala', value: 'gala' },
  { label: 'Fuji', value: 'fuji' },
  { label: 'Honeycrisp', value: 'honeycrisp' },
  { label: 'Granny Smith', value: 'granny-smith' },
  { label: 'Pink Lady', value: 'pink-lady' },
];

const meta = {
  title: 'BaseUI/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Apple',
    placeholder: 'Select Apple',
    items: apples,
    children: 'something',
  },
  render: (args) => {
    return (
      <Select {...args}>
        {apples.map(({ label, value }) => (
          <SelectItem key={value} label={label} value={value} />
        ))}
      </Select>
    );
  },
};
