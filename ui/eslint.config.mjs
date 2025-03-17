import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.tsx', '.ts'] }],
            'indent': ['error', 4, {'SwitchCase': 1}],
            'semi': [2, 'always'],
            'eol-last': 2,
            'quotes': [2, 'single'],
            '@typescript-eslint/no-non-null-assertion': 'off',
            'react/react-in-jsx-scope': 'off'
        }
    },
    {
        settings: {
            'react': {
                'version': 'detect'
            }
        }
    },
    {
        ignores: ['node_modules/', 'dist/', 'public/', 'webpack.config.js'],
    }
];
