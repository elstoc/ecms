import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Item, Select } from './Select';

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
  args: {
    label: 'Item',
    value: null,
    items: items,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: Item | null) => {
      updateArgs({ value: newValue });
    };

    return (
      <Select label={args.label} items={args.items as Items} value={value} onChange={onChange} />
    );
  },
};
