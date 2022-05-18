const path = require('path');
const fs = require('fs');

const Reporter = require('../reporter');

const root = path.resolve(__dirname, 'test');

const setup = () => ({
  root,
  reporter: new Reporter(root)
});

const cleanup = () => fs.rmSync(root, { recursive: true, force: true });

module.exports = {
  setup,
  cleanup
};
