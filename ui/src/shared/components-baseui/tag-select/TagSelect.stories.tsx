import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { TagSelect } from './TagSelect';

const selectableTags = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
];

const meta = {
  title: 'BaseUI/TagSelect',
  component: TagSelect,
} satisfies Meta<typeof TagSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select a language',
    emptyMessage: 'Nothing to see here',
    selectedTags: [],
    selectableTags,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ selectedTags }, updateArgs] = useArgs();

    const onChange = (newTags: string[]) => {
      updateArgs({ selectedTags: newTags });
    };

    return <TagSelect {...args} selectedTags={selectedTags} onChange={onChange} />;
  },
};

export const AllowCreation: Story = {
  ...Default,
  args: {
    ...Default.args,
    allowCreation: true,
  },
};
