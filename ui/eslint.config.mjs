// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier/flat';
import pluginReact from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  configPrettier,
  {
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
      semi: [2, 'always'],
      'eol-last': 2,
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/display-name': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'public/', 'webpack.config.js'],
  },
  ...storybook.configs['flat/recommended'],
];
