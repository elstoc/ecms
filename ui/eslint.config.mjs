// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  eslintJs.configs.recommended,
  tseslint.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  configPrettier,
  {
    rules: {
      semi: [2, 'always'],
      'eol-last': 2,
      '@typescript-eslint/no-non-null-assertion': 'off',
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
    ignores: ['node_modules/', 'dist/', 'public/', 'webpack.config.js', 'storybook-static/'],
  },
  ...storybook.configs['flat/recommended'],
]);
