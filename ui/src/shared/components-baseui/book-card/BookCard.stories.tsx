import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { BookCard } from './BookCard';

const bookDesc =
  '<p>Guy Montag is a fireman. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden. Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television “family.” But when he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people didn’t live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television, Montag begins to question everything he has ever known.</p>';

const meta = {
  title: 'BaseUI/BookCard',
  component: BookCard,
} satisfies Meta<typeof BookCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  argTypes: {
    expanded: { table: { readonly: true } },
  },
  args: {
    expanded: false,
    onExpandedChange: () => undefined,
    title: 'Fahrenheit 451',
    authors: 'Ray Bradbury',
    format: 'epub',
    read: true,
    devices: ['kobo', 'kindle'],
    rating: 5,
    path: 'Fiction/Ray Bradbury',
    description: bookDesc,
    coverUrl: 'https://m.media-amazon.com/images/I/71b674P2aKL._SL1500_.jpg',
  },
  render: (args) => {
    const [{ expanded }, updateArgs] = useArgs();

    const onExpandedChange = () => {
      updateArgs({ expanded: !expanded });
    };

    return <BookCard {...args} onExpandedChange={onExpandedChange} expanded={expanded} />;
  },
} satisfies Story;
