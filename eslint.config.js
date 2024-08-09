import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react'
import eslintConfigPrettier from "eslint-config-prettier";


export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended,
    eslintConfigPrettier
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: [
    'dist',
    'logs',
    '*.log',
    'pids',
    '*.pid',
    '*.seed',
    'coverage',
    '.eslintcache',
    'node_modules',
    '.DS_Store',
    'release/app/dist',
    'release/build',
    '.erb/dll',
    '.idea',
    'npm-debug.log.*',
    '*.css.d.ts',
    '*.sass.d.ts',
    '*.scss.d.ts',
    '*.eslintrc.js',
    '*.eslintrc.cjs',
    'serviceWorkerRegistration.ts',
    'setupTests.ts',
    './ios',
    './android',
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'prettier': prettier,
    'react': react,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': 'warn',
    'no-console': 'off',
    'no-case-declarations': 'off',
    'promise/always-return': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
})
