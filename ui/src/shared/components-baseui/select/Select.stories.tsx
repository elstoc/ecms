import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Select } from './Select';
import { SelectItem } from './SelectItem';

const twentyNumbers = [...Array(20).keys()];

type Items = { value: string; label: string }[];

const items = twentyNumbers.map((number) => ({ label: `Item #${number}`, value: `item${number}` }));

const meta = {
  title: 'BaseUI/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: { type: 'string' },
  },
  args: {
    label: 'Item',
    value: null,
    items: items,
    children: 'something',
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string | null) => {
      updateArgs({ value: newValue });
    };

    return (
      <Select label={args.label} items={args.items as Items} value={value} onChange={onChange}>
        {items.map(({ label, value: itemValue }) => (
          <SelectItem key={itemValue} label={label} value={itemValue} />
        ))}
      </Select>
    );
  },
};
