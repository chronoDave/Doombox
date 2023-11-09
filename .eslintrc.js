module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  extends: [
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:promise/recommended'
  ],
  settings: {
    react: {
      pragma: 'forgo',
      version: '0'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx']
      }
    },
    'import/core-modules': [
      'sass',
      'minimist',
      'esbuild',
      'jsdom',
      'electron',
      'chokidar'
    ]
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: [
    '**/build/**/*.js'
  ],
  overrides: [{
    files: ['test/build.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  }, {
    files: ['test/shim.js'],
    rules: {
      'prefer-destructuring': 'off'
    }
  }, {
    files: ['src/app/lib/**/*'],
    rules: {
      'no-console': 'error'
    }
  }],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: 'initial'
    }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/ban-ts-comment': ['error', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': {
        descriptionFormat: ':\\sTS\\d+\\s-\\s\\w+'
      }
    }],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
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
      // Disable underscore on public members
      selector: [
        'classProperty',
        'classMethod'
      ],
      modifiers: ['public'],
      format: ['camelCase'],
      leadingUnderscore: 'forbid'
    }, {
      // Enforce underscore on private members
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'require'
    }, {
      // Enforce underscore on protected members
      selector: 'memberLike',
      modifiers: ['protected'],
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
    'no-unused-vars': 'off',
    'no-promise-executor-return': 'off',
    'linebreak-style': 'off',
    'no-confusing-arrow': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'function-paren-newline': ['error', 'consistent'],
    'max-len': ['error', {
      code: 100,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true
    }],
    'no-restricted-syntax': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    'object-curly-newline': ['warn', {
      ObjectPattern: { minProperties: 4 },
      ImportDeclaration: { minProperties: 4 }
    }],
    // Import
    'import/no-restricted-paths': ['error', {
      zones: [
        ...[
          'src/renderer/components',
          'src/renderer/views',
          'src/renderer/hooks',
          'src/renderer/lib',
          'src/renderer/utils'
        ].map(target => ({
          target,
          from: 'src/renderer/state',
          message: 'Should be stateless'
        })),
        ...[
          'src/renderer/views'
        ].map(target => ({
          target,
          from: 'src/renderer/state',
          except: ['./selectors', './actions'],
          message: 'State should not be accessed directly, use selectors or actions instead.'
        })),
        {
          target: 'src/renderer',
          from: 'src/app',
          message: 'Renderer should not directly import from app'
        }, {
          target: 'src/app',
          from: 'src/renderer',
          message: 'App should not directly import from renderer'
        }
      ]
    }],
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': ['error', {
      commonjs: true,
      ignore: [
        'forgo',
        'music-metadata'
      ],
      caseSensitiveStrict: true
    }],
    'import/no-deprecated': 'warn',
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      'newlines-between': 'always',
      warnOnUnassignedImports: true,
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      },
      pathGroups: [{
        pattern: './*.scss',
        group: 'index',
        position: 'before'
      }],
      pathGroupsExcludedImportTypes: ['builtin'],
      groups: [
        'type',
        ['builtin', 'external'],
        'internal',
        'parent',
        'sibling',
        'index'
      ]
    }],
    // React
    'react/button-has-type': 'error',
    'react/no-unescaped-entities': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-multi-comp': 'error',
    'react/self-closing-comp': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react/forbid-dom-props': ['error', {
      forbid: ['className']
    }],
    'react/forbid-elements': ['error', {
      forbid: [
        ...[
          'small',
          'b',
          'i'
        ].map(element => ({
          element,
          message: `<${element}> violates the principle of separation between structure and presentation, use CSS instead.`
        }))
      ]
    }],
    // JSX
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-curly-newline': 'error',
    'react/jsx-max-props-per-line': ['error', {
      maximum: 2,
      when: 'multiline'
    }],
    'react/jsx-tag-spacing': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-closing-tag-location': 'error'
  }
};
