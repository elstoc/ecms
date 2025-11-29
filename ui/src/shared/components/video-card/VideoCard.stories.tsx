import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';
import { fn } from 'storybook/test';

import { VideoCard } from './VideoCard';

const meta = {
  title: 'VideoCard',
  component: VideoCard,
} satisfies Meta<typeof VideoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  argTypes: {
    expanded: { table: { readonly: true } },
  },
  args: {
    expanded: false,
    onExpandedChange: () => undefined,
    title: 'The Greatest Movie of All Time',
    formatDesc: '4k Blu Ray',
    lengthDesc: '180 mins',
    categoryDesc: 'Movie',
    locationDesc: 'somewhere',
    otherMediaDesc: 'Blu Ray (in a box)',
    tags: ['some', 'tag'],
    watched: 'P',
    mediaWatched: 'Y',
    mediaNotes: 'Going to watch it again',
    progress: 'Missed the post-credit scene',
    flagged: false,
    onFlaggedChange: () => undefined,
    onPressEdit: fn(),
  },
  render: (args) => {
    const [{ expanded, flagged }, updateArgs] = useArgs();

    const onExpandedChange = () => {
      updateArgs({ expanded: !expanded });
    };

    const onFlagChange = () => {
      updateArgs({ flagged: !flagged });
    };

    return (
      <VideoCard
        {...args}
        onExpandedChange={onExpandedChange}
        expanded={expanded}
        onFlaggedChange={onFlagChange}
        flagged={flagged}
      />
    );
  },
} satisfies Story;

export const MinimalData = {
  args: {
    ...Default.args,
    tags: undefined,
    otherMediaDesc: undefined,
    mediaNotes: undefined,
    progress: undefined,
  },
  render: Default.render,
} satisfies Story;
