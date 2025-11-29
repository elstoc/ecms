import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Tag, TagListStatic } from './TagListStatic';

const meta = {
  title: 'TagListStatic',
  component: TagListStatic,
} satisfies Meta<typeof TagListStatic>;

export default meta;

type Story = StoryObj<typeof meta>;

const children = (
  <>
    <Tag label='some-dark-tag' dark />
    <Tag label='some-light-tag' />
    <Tag label='some-other-light-tag' />
  </>
);

export const Default: Story = {
  argTypes: {
    children: { control: { disable: true } },
  },
  args: {
    label: 'some-label',
    children,
  },
};
