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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      disableSaveFromUI: true,
    },
  },
};

export default preview;
