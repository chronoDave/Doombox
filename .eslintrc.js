module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  settings: {
    'import/core-modules': [
      'electron'
    ]
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  overrides: [{
    files: ['test/build.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  }],
  rules: {
    // TypeScript
    '@typescript-eslint/consistent-type-imports': 'error',
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
    'no-param-reassign': ['error', {
      ignorePropertyModificationsFor: ['draft']
    }],
    'class-methods-use-this': ['error', {
      exceptMethods: ['view']
    }],
    'no-promise-executor-return': 'off',
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
      warnOnUnassignedImports: true,
      pathGroups: [{
        pattern: 'src/**',
        group: 'internal'
      }],
      pathGroupsExcludedImportTypes: ['builtin'],
      groups: [
        ['builtin', 'external'],
        'internal',
        'type',
        'parent',
        ['sibling', 'index']
      ]
    }]
  }
};
