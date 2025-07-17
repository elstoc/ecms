import type { Preview } from '@storybook/react-webpack5';
import 'modern-normalize';

import '../src/theme.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ minWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
