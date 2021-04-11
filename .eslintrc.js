module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    'import/core-modules': [
      'electron'
    ]
  },
  rules: {
    // Typescript
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off', // Leaf-DB
    'no-bitwise': 'warn',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true
    }],
    'no-console': ['error', {
      allow: ['info', 'warn', 'error', 'group', 'groupEnd']
    }],
    'class-methods-use-this': 'off',
    // React
    'react/jsx-fragments': 'off', // Prefer verbose syntax
    'react/jsx-props-no-spreading': 'off', // Spread appropriatly
    'react/destructuring-assignment': 'off',
    // Import
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      groups: [
        'builtin',
        ['external', 'internal'],
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always-and-inside-groups'
    }]
  }
};
