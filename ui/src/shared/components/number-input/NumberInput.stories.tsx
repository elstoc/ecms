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
    value: 0,
    onChange: () => undefined,
    label: 'Field label',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (value?: number) => {
      updateArgs({ value });
    };

    return <NumberInput {...args} value={value} onChange={onChange} />;
  },
};

export const TruncateInteger: Story = {
  args: {
    ...Default.args,
    step: 1,
  },
  render: Default.render,
};
