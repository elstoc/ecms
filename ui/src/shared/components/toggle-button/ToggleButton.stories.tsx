import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { ToggleButton } from './ToggleButton';

const meta = {
  title: 'ToggleButton',
  component: ToggleButton,
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button text',
    isSelected: false,
  },
  render: (args) => {
    const [{ isSelected }, updateArgs] = useArgs();

    const onChange = (isSelected: boolean) => {
      updateArgs({ isSelected });
    };

    return <ToggleButton {...args} isSelected={isSelected} onChange={onChange} />;
  },
};
