import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Key } from 'react-aria-components';
import { useArgs } from 'storybook/internal/preview-api';

import { ToggleButton } from '../toggle-button';

import { ToggleButtonGroup } from './ToggleButtonGroup';

const meta = {
  title: 'ToggleButtonGroup',
  component: ToggleButtonGroup,
  argTypes: { children: { control: { disable: true } } },
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label text',
    selectedKeys: ['first'],
    onSelectionChange: () => undefined,
    children: 'whatever',
  },
  render: (args) => {
    const [{ selectedKeys }, updateArgs] = useArgs();

    const onSelectionChange = (selectedKeys: Key[]) => {
      updateArgs({ selectedKeys: selectedKeys });
    };

    return (
      <ToggleButtonGroup
        {...args}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
      >
        <ToggleButton id='first'>First</ToggleButton>
        <ToggleButton id='second'>Second</ToggleButton>
        <ToggleButton id='third'>Third</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};
