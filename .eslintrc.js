module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    camelcase: 'off',
    quotes: ['error', 'single'],
    semi: [2, 'always'],
    'spaced-comment': 'error',
    'no-duplicate-imports': 'error',
    'no-console': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        custom: {
          match: true,
          regex: '^[A-Z]',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'var'],
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
      {
        blankLine: 'never',
        next: '*',
        prev: ['case', 'default'],
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['multiline-const'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        endOfLine: 'lf',
        printWidth: 100,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
        tabWidth: 2,
        useTabs: false,
        trailingComma: 'all',
        htmlWhitespaceSensitivity: 'css',
        singleAttributePerLine: false,
        embeddedLanguageFormatting: 'auto',
        proseWrap: 'preserve',
        requirePragma: false,
        insertPragma: false,
        overrides: [
          {
            files: '.prettierrc',
            options: {
              parser: 'json',
            },
          },
          {
            files: '*.json',
            options: {
              printWidth: 200,
            },
          },
        ],
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'internal'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@/**/*',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'builtin'],
      },
    ],
  },
};
