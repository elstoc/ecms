import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { SelectDescribedCode } from './SelectDescribedCode';

const meta = {
  title: 'SelectDescribedCode',
  component: SelectDescribedCode,
} satisfies Meta<typeof SelectDescribedCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Field label',
    selectedCode: undefined,
    items: { i1: 'first item', i2: 'second item', i3: 'third item' },
    onSelectCode: () => undefined,
  },
  render: (args) => {
    const [{ selectedCode }, updateArgs] = useArgs();

    const onSelectCode = (code?: string) => {
      updateArgs({ selectedCode: code });
    };

    return (
      <SelectDescribedCode {...args} onSelectCode={onSelectCode} selectedCode={selectedCode} />
    );
  },
};
