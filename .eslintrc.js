module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
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
    // TypeScript
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
    '@typescript-eslint/naming-convention': ['error', {
      // Enforce camelCase
      selector: 'variableLike',
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow'
    }, {
      // Ignore imports
      selector: 'variable',
      format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
      modifiers: ['global']
    }, {
      // Enforce underscore on private members
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'require'
    }, {
      // Enforce sensible boolean prefixes
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'has']
    }, {
      // Enforce PascalCase on types / interfaces
      selector: 'typeLike',
      format: ['PascalCase']
    }],
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1,
      ignoredNodes: ['TSTypeParameterInstantiation']
    }],
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'no-confusing-arrow': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'max-len': ['error', {
      code: 100,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true
    }],
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    'object-curly-newline': ['warn', {
      ObjectPattern: { minProperties: 4 },
      ImportDeclaration: { minProperties: 4 }
    }],
    // Import
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      'newlines-between': 'always',
      groups: [
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling'],
        'index'
      ]
    }]
  }
};
