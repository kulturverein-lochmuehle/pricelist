// @ts-check

import eslintJs from '@eslint/js';
import eslintPluginLit from 'eslint-plugin-lit';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginWC from 'eslint-plugin-wc';
import eslintTs from 'typescript-eslint';

export default eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  eslintPluginWC.configs['flat/recommended'],
  eslintPluginLit.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/', 'node_modules/'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: './',
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
    },
  },
  {
    rules: {
      // formatting
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],

      // unused imports
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  },
);
