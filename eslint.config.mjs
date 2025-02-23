import css from '@eslint/css';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPluginConfigsRecommended from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules', '.cache', '.yarn', 'packages/**/*'],
  },
  ...tseslint.config({
    files: ['**/*.ts', '**/*.tsx', '**/*.mjs'],
    extends: [
      js.configs.recommended,
      // eslint-disable-next-line import/no-named-as-default-member
      tseslint.configs.recommended,
      unicorn.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      prettierPluginConfigsRecommended,
    ],
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      'import/extensions': ['.js', '.cjs', '.mjs', '.ts', '.tsx'],
      'import/internal-regex': '^@/',
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ignorePackages: true,
          pattern: {
            ts: 'always',
            tsx: 'always',
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
    },
  }),
  {
    files: ['**/*.css'],
    language: 'css/css',
    ...css.configs.recommended,
  },
];
