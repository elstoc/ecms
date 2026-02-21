import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { ToggleGroup } from './ToggleGroup';

const items = [
  { value: '01', label: 'First' },
  { value: '02', label: 'Second' },
  { value: '03', label: 'Third' },
];

const meta = {
  title: 'ToggleGroup',
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ['01'],
    label: 'Toggle group label',
    items,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string[]) => {
      updateArgs({ value: newValue });
    };

    return <ToggleGroup {...args} value={value} onChange={onChange} />;
  },
};

export const AllowEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: [],
    allowEmpty: true,
  },
};

export const AllowMultiple: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: ['01', '02'],
    allowMultiple: true,
  },
};
