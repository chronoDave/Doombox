const { dir } = require('./arkit-config');
const schema = require('./arkit-schema.json');

module.exports = {
  $schema: schema,
  components: [
    {
      type: 'Components',
      patterns: [
        dir.react('components/**/*.jsx'),
        dir.react('components/**/*.style.js'),
        dir.react('components/**/index.js')
      ]
    },
    {
      type: 'Modules',
      patterns: [
        dir.react('modules/**/*.jsx'),
        dir.react('modules/**/*.style.js'),
        dir.react('modules/**/index.js')
      ]
    },
    {
      type: 'Entities',
      patterns: [
        dir.react('entities/**/*.jsx'),
        dir.react('entities/**/*.style.js'),
        dir.react('entities/**/index.js')
      ]
    },
    {
      type: 'Templates',
      patterns: [
        dir.react('templates/**/*.jsx'),
        dir.react('templates/**/*.style.js'),
        dir.react('templates/**/index.js')
      ]
    },
    {
      type: 'Pages',
      patterns: [
        dir.react('pages/**/*.jsx'),
        dir.react('pages/**/*.style.js'),
        dir.react('pages/**/index.js')
      ]
    },
    {
      type: 'Router',
      patterns: [dir.react('listeners/Router/*.jsx')]
    }
  ],
  output: {
    path: '../../arkit/react-render.arkit.svg',
    groups: [
      {
        first: true,
        type: 'Root',
        components: [
          'Router',
          'Template',
          'Pages',
          'Components',
          'Modules',
          'Entities'
        ]
      }
    ]
  }
};
