import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { TagListInput } from './TagListInput';

const meta = {
  title: 'TagListInput',
  component: TagListInput,
} satisfies Meta<typeof TagListInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedTags: new Set(['tag-the-first', 'tag-the-second', 'tag-the-third']),
  },
  argTypes: {
    selectedTags: { control: { disable: true } },
    onRemoveTag: () => undefined,
  },
  render: (args) => {
    const [{ selectedTags }, updateArgs] = useArgs();

    const onRemoveTag = (tag: string) => {
      const newSet = new Set(selectedTags);
      newSet.delete(tag);
      updateArgs({ selectedTags: newSet });
    };

    return <TagListInput {...args} onRemoveTag={onRemoveTag} selectedTags={selectedTags} />;
  },
};
