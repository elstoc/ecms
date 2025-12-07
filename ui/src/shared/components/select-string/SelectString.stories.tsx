import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { SelectString } from './SelectString';

const meta = {
  title: 'SelectString',
  component: SelectString,
} satisfies Meta<typeof SelectString>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Field label',
    items: ['item1', 'item2', 'item3', 'item4'],
    onSelectItem: () => undefined,
  },
  render: (args) => {
    const [{ selectedItem }, updateArgs] = useArgs();

    const onSelectItem = (item?: string) => {
      updateArgs({ selectedItem: item });
    };

    return <SelectString {...args} onSelectItem={onSelectItem} selectedItem={selectedItem} />;
  },
};
