const { dir } = require('./arkit-config');
const schema = require('./arkit-schema.json');

module.exports = {
  $schema: schema,
  excludePatterns: [
    dir.electron('**/*.spec.js'),
    dir.electron('config.js'),
    dir.electron('config.dev.js')
  ],
  components: [
    {
      type: 'Root',
      patterns: [dir.electron('*.js')]
    },
    {
      type: 'Validation',
      patterns: [dir.electron('validation/*.js')]
    },
    {
      type: 'Utils',
      patterns: [dir.electron('utils/*.js')]
    },
    {
      type: 'Lib',
      patterns: [dir.electron('lib/*.js')]
    },
    {
      type: 'Database',
      patterns: [dir.electron('lib/database/*')]
    },
    {
      type: 'Controller',
      patterns: [dir.electron('lib/controller/*')]
    }
  ],
  output: {
    path: '../../arkit/electron.arkit.svg',
    groups: [
      {
        type: 'Root',
        components: ['Root']
      },
      {
        type: 'Validation',
        components: ['Validation']
      },
      {
        type: 'Utils',
        components: ['Utils']
      },
      {
        type: 'Lib',
        components: [
          'Controller',
          'Lib',
          'Database'
        ]
      }
    ]
  }
};
