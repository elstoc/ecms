import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Item, TagSelect } from './TagSelect';

const items: Item[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'cs', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
];

const meta = {
  title: 'BaseUI/TagSelect',
  component: TagSelect,
} satisfies Meta<typeof TagSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items,
  },
  render: (args) => {
    return <TagSelect {...args} />;
  },
};
