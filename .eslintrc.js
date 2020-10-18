module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ['airbnb', 'airbnb/hooks'],
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: 'webpack.config.js'
      }
    },
    'import/core-modules': [
      '@babel/register',
      '@babel/polyfill',
      'electron',
      'tape',
      'sinon',
      'chokidar'
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
