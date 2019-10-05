const glob = require('glob');
const rimraf = require('rimraf');
const groupBy = require('lodash.groupby');

const scan = async props => {
  const {
    store,
    event,
    payload,
    parser: {
      id3
    },
    db
  } = props;
  const config = store.get('config');

  await db.drop('library');
  await db.drop('images');

  rimraf.sync(config.imagePath, { disableGlob: true });

  const rawFiles = await Promise.all(
    payload.map(({ path }) => new Promise(resolve => glob(
      '/**/*.mp3',
      { root: path },
      (err, matches) => {
        if (err) {
          event.handleError(err);
        } else {
          resolve(matches);
        }
      }
    )))
  );

  const files = rawFiles.flat();

  id3.parseRecursive(files, event);
};

const readGrouped = async props => {
  const {
    handleSuccess,
    payload: {
      group,
      ...rest
    },
    db
  } = props;

  const docs = await db.read({ collection: 'library', ...rest });
  const groupedDocs = groupBy(docs, group);

  handleSuccess(groupedDocs);
};

module.exports = {
  scan,
  readGrouped
};
