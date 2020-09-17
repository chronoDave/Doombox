module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['ava'],
  settings: {
    'import/core-modules': [
      'electron',
      'chokidar',
      'sinon',
      'ava'
    ]
  },
  rules: {
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off', // Leaf-DB
    'object-curly-newline': ['warn', {
      ObjectPattern: { minProperties: 4 },
      ImportDeclaration: { minProperties: 3 }
    }],
    // React
    'react/jsx-fragments': 'off', // Prefer verbose syntax
    'react/jsx-props-no-spreading': 'off', // Spread appropriatly
    'react/destructuring-assignment': 'off',
    // Import
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always-and-inside-groups'
    }]
  }
};
