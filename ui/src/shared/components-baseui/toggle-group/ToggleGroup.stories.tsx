import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Toggle } from '../toggle';

import { ToggleGroup } from './ToggleGroup';

const meta = {
  title: 'BaseUI/ToggleGroup',
  component: ToggleGroup,
  argTypes: { children: { control: { disable: true } } },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ['first'],
    onValueChange: () => undefined,
    label: 'Toggle group label',
    children: 'whatever',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const onValueChange = (newValue: string[]) => {
      updateArgs({ value: newValue });
    };

    return (
      <ToggleGroup {...args} value={value} onValueChange={onValueChange}>
        <Toggle value='01'>First</Toggle>
        <Toggle value='02'>Second</Toggle>
        <Toggle value='03'>Third</Toggle>
      </ToggleGroup>
    );
  },
};
