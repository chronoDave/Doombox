const { dir } = require('./arkit-config');
const schema = require('./arkit-schema.json');

module.exports = {
  $schema: schema,
  components: [
    {
      type: 'Root',
      patterns: [dir.electron('**/*.js')],
      excludePatterns: [dir.electron('utils/*.js')]
    }
  ],
  output: {
    path: '../../arkit/electron.arkit.svg',
    groups: [
      {
        first: true,
        type: 'Root',
        components: ['Root']
      }
    ]
  }
};
