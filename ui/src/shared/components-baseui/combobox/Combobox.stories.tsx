import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Combobox } from './Combobox';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Grapefruit', value: 'grapefruit' },
  { label: 'Passionfruit', value: 'passionfruit' },
];

const meta = {
  title: 'BaseUI/Combobox',
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {},
  args: {
    label: 'Choose a fruit',
    emptyMessage: 'No fruits found',
    value: null,
    items: fruits,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string | null) => {
      updateArgs({ value: newValue });
    };

    return (
      <Combobox
        label={args.label}
        emptyMessage={args.emptyMessage}
        items={args.items}
        value={value}
        onChange={onChange}
      />
    );
  },
};
