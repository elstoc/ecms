import type { Preview } from '@storybook/react-webpack5';
import 'modern-normalize';

import '../src/theme.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: 'min(800px, 80vw)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          isolation: 'isolate',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    layout: 'centered',
    controls: {
      exclude: ['key', 'ref'],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      disableSaveFromUI: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: { disable: true } },
  },
};

export default preview;
