import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Select } from './Select';

const twentyNumbers = [...Array(20).keys()];

const items = twentyNumbers.map((number) => ({ label: `Item #${number}`, value: `item${number}` }));

const meta = {
  title: 'Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose an item',
    value: null,
    width: undefined,
    items: items,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string | null) => {
      updateArgs({ value: newValue });
    };

    return <Select {...args} value={value} onChange={onChange} />;
  },
};
