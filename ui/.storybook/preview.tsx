import type { Preview } from '@storybook/react-webpack5';
import 'modern-normalize';

import '../src/theme.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '800px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
    className: { control: { type: 'text' } },
  },
};

export default preview;
