import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';

import { Button } from '../button';

import { ToastProvider } from './ToastProvider';
import { useToastManager } from './useToastManager';

const ExampleToast = () => {
  const toastManager = useToastManager();
  const [count, setCount] = useState(0);

  function createToast() {
    setCount((prev) => prev + 1);
    toastManager.add({
      title: `Toast ${count + 1} created`,
      description: 'This is a toast notification.',
    });
  }

  return <Button onClick={createToast}>Create toast</Button>;
};

const meta = {
  title: 'BaseUI/Toast',
  component: ExampleToast,
} satisfies Meta<typeof ExampleToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider timeout={3000}>
      <ExampleToast />
    </ToastProvider>
  ),
};
