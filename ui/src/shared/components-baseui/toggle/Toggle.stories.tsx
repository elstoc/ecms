import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Toggle } from './Toggle';

const meta = {
  title: 'BaseUI/Toggle',
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle text',
    pressed: false,
  },
  render: (args) => {
    const [{ pressed }, updateArgs] = useArgs();

    const onPressedChange = (pressed: boolean) => {
      updateArgs({ pressed });
    };

    return <Toggle {...args} pressed={pressed} onPressedChange={onPressedChange} />;
  },
};
