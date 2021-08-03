module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks'
  ],
  settings: {
    'import/core-modules': [
      'electron',
      'chokidar'
    ]
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // TypeScript
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['draft']
    }], // Immer
    'comma-dangle': 'off',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    'no-confusing-arrow': 'off',
    'arrow-body-style': 'warn',
    'class-methods-use-this': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off', // Leaf-DB
    'no-bitwise': 'warn',
    'consistent-return': 'off',
    'no-console': ['error', {
      allow: ['info', 'warn', 'error', 'group', 'groupEnd']
    }],
    // React
    'react/react-in-jsx-scope': 'off', // Inferno
    'react/jsx-fragments': 'off', // Prefer verbose syntax
    'react/prop-types': 'off', // TypeScript
    'react/destructuring-assignment': 'off',
    // Import
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      groups: [
        ['builtin', 'external', 'internal'],
        ['parent', 'sibling'],
        'index'
      ],
      'newlines-between': 'always-and-inside-groups'
    }]
  }
};
