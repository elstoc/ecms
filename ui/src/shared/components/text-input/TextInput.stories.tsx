import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { TextInput } from './TextInput';

const meta = {
  title: 'TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'initial value',
    onChange: () => undefined,
    label: 'Field label',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (value?: string) => {
      updateArgs({ value });
    };

    return <TextInput {...args} value={value} onChange={onChange} />;
  },
};
