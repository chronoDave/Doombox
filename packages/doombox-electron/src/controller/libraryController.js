const glob = require('glob');
const rimraf = require('rimraf');

// Parser
const { parseRecursive } = require('../lib/parser');

const scan = async props => {
  const {
    store,
    event,
    payload,
    db
  } = props;
  const config = store.get('config');

  await db.drop('library');
  await db.drop('images');

  rimraf.sync(config.imagePath, { disableGlob: true });

  const rawFiles = await Promise.all(
    payload.map(({ path }) => new Promise(resolve => glob(
      '/**/*.?(mp3)',
      { root: path },
      (err, matches) => resolve(matches)
    )))
  );
  const files = rawFiles.flat();

  parseRecursive({
    event,
    files,
    db,
    config
  });
};

module.exports = {
  scan
};
