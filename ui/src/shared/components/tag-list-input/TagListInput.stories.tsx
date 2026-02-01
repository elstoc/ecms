import { Meta, StoryObj } from '@storybook/react-webpack5';

import { TagListInput } from './TagListInput';

const meta = {
  title: 'TagListInput',
  component: TagListInput,
} satisfies Meta<typeof TagListInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    allTags: { control: { disable: true } },
  },
  args: {
    allTags: new Set(['tag-the-first', 'tag-the-second', 'tag-the-third']),
  },
};
