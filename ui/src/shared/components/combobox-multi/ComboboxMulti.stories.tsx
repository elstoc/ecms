import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { ComboboxMulti, Item } from './ComboboxMulti';

const items: Item[] = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'py' },
  { label: 'Java', value: 'ja' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'cs' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'rb' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rst' },
  { label: 'Swift', value: 'swf' },
];

const meta = {
  title: 'ComboboxMulti',
  component: ComboboxMulti,
} satisfies Meta<typeof ComboboxMulti>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select a language',
    emptyMessage: 'Nothing to see here',
    value: [],
    width: undefined,
    items,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValues: string[]) => {
      updateArgs({ value: newValues });
    };

    return <ComboboxMulti {...args} value={value} onChange={onChange} />;
  },
};
