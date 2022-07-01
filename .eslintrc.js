module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
    browser: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    jsx: true,
    useJSXTextNode: true,
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],

  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],

  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-implicit-coercion': 'error',

    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-extra-boolean-cast': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',

    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling'], 'index'],

        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'import/no-unresolved': [
      'error',
      {
        ignore: ['.svg'],
      },
    ],
  },

  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
  },
};
