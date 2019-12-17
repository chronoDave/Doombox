const { dir } = require('./arkit-config');
const schema = require('./arkit-schema.json');

module.exports = {
  $schema: schema,
  components: [
    {
      type: 'Root',
      patterns: [dir.react('index.jsx')]
    },
    {
      type: 'Actions',
      patterns: [dir.react('actions/*.js')]
    },
    {
      type: 'Context',
      patterns: [
        dir.react('hooks/*.js'),
        dir.react('utils/context.js')
      ]
    },
    {
      type: 'Providers',
      patterns: [
        dir.react('providers/index.js'),
        dir.react('providers/**/*.jsx')
      ]
    },
    {
      type: 'Listeners',
      patterns: [
        dir.react('listeners/index.js'),
        dir.react('listeners/**/*.jsx')
      ]
    },
    {
      type: 'Render',
      patterns: [
        dir.react('components/**/*.jsx'),
        dir.react('components/**/index.js'),
        dir.react('modules/**/*.jsx'),
        dir.react('modules/**/index.js'),
        dir.react('entities/**/*.jsx'),
        dir.react('entities/**/index.js'),
        dir.react('templates/**/*.jsx'),
        dir.react('templates/**/index.js'),
        dir.react('pages/**/*.jsx'),
        dir.react('pages/**/index.js'),
        dir.react('listeners/**/index.js'),
        dir.react('listeners/**/*.jsx')
      ]
    }
  ],
  output: {
    path: '../../arkit/react-flow.arkit.svg',
    groups: [
      {
        first: true,
        type: 'Flow',
        components: [
          'Render',
          'Providers',
          'Root',
          'Context',
          'Actions',
          'Listeners'
        ]
      }
    ]
  }
};
