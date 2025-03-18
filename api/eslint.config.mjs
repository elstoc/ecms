import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['**/*.{js,mjs,cjs,ts}']},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'indent': ['error', 4, {'SwitchCase': 1}],
            'semi': [2, 'always'],
            'eol-last': 2,
            'quotes': [2, 'single'],
            '@typescript-eslint/no-non-null-assertion': 'off',
        }
    },
    {
        ignores: ['node_modules/', 'dist/', 'public/'],
    }
];
