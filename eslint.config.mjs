import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/logs',
      '**/*.log',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/lerna-debug.log*',
      '**/.pnpm-debug.log*',
      '**/report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
      '**/pids',
      '**/*.pid',
      '**/*.seed',
      '**/*.pid.lock',
      '**/lib-cov',
      '**/coverage',
      '**/*.lcov',
      '**/.nyc_output',
      '**/.grunt',
      '**/bower_components',
      '**/.lock-wscript',
      'build/Release',
      '**/node_modules/',
      '**/jspm_packages/',
      '**/web_modules/',
      '**/*.tsbuildinfo',
      '**/.npm',
      '**/.eslintcache',
      '**/.stylelintcache',
      '**/.rpt2_cache/',
      '**/.rts2_cache_cjs/',
      '**/.rts2_cache_es/',
      '**/.rts2_cache_umd/',
      '**/.node_repl_history',
      '**/*.tgz',
      '**/.yarn-integrity',
      '**/.env',
      '**/.env.development.local',
      '**/.env.test.local',
      '**/.env.production.local',
      '**/.env.local',
      '**/.cache',
      '**/.parcel-cache',
      '**/.next',
      '**/out',
      '**/.nuxt',
      '**/dist',
      '**/.cache/',
      '.vuepress/dist',
      '**/.temp',
      '**/.docusaurus',
      '**/.serverless/',
      '**/.fusebox/',
      '**/.dynamodb/',
      '**/.tern-port',
      '**/.vscode-test',
      '.yarn/cache',
      '.yarn/unplugged',
      '.yarn/build-state.yml',
      '.yarn/install-state.gz',
      '**/.pnp.*',
      'node_modules',
      '.pnp',
      '**/.pnp.js',
      'coverage',
      '.next/',
      '.out/',
      'build',
      '**/.DS_Store',
      '**/*.pem',
      '**/.env*.local',
      '**/.vercel',
      '**/next-env.d.ts',
      'packages/**/*',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:unicorn/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      unicorn: fixupPluginRules(unicorn),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
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
  },
];
