const path = require('path');
const fs = require('fs');

const Reporter = require('../reporter');

const root = path.resolve(__dirname, 'test');

const setup = () => ({
  root,
  reporter: new Reporter(root)
});

const cleanup = () => fs.rmdirSync(root, { recursive: true });

module.exports = {
  setup,
  cleanup
};
