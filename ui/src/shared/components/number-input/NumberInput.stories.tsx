import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { NumberInput } from './NumberInput';

const meta = {
  title: 'NumberInput',
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enter a number',
    value: null,
    width: undefined,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: number | null) => {
      updateArgs({ value: newValue });
    };

    return <NumberInput {...args} value={value} onChange={onChange} />;
  },
};

export const IntegerOnly: Story = {
  ...Default,
  args: { ...Default.args, maximumFractionDigits: 0 },
};
