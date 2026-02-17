import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/internal/preview-api';

import { Switch } from './Switch';

const meta = {
  title: 'Switch',
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Switch the switch',
    checked: false,
    onChange: () => undefined,
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    const onChange = (newValue: boolean) => {
      updateArgs({ checked: newValue });
    };

    return <Switch label={args.label} checked={checked} onChange={onChange} />;
  },
};
