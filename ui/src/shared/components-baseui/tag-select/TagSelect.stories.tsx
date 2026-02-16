import { Meta, StoryObj } from '@storybook/react-webpack5';

import { TagSelect } from './TagSelect';

const meta = {
  title: 'BaseUI/TagSelect',
  component: TagSelect,
} satisfies Meta<typeof TagSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <TagSelect {...args} />;
  },
};
