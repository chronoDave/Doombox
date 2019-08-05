const {
  ERROR
} = require('@doombox/utils/types/asyncTypes');
const {
  CREATE
} = require('@doombox/utils/types/crudTypes');
const {
  create,
  LIBRARY
} = require('@doombox/utils/types');
const glob = require('glob');

// Parser
const { parseID3 } = require('../../../lib/decoder');

const readRecursive = (event, files, iteration) => {
  if (!Array.isArray(files)) return null;
  const batchSize = 50;
  const batches = Math.ceil(files.length / batchSize);

  const offset = batchSize * iteration;

  return Promise.all(files.slice(
    offset,
    offset + batchSize
  ).map(file => parseID3(file)))
    .then(data => {
      console.log(`${iteration + 1} / ${batches}`);
      if (iteration < batches) {
        console.log(data); // TODO
        // pouchController.createBulk(event, LIBRARY, data);

        readRecursive(files, iteration + 1);
      }
    })
    .catch(err => event.sender.send(create([ERROR, CREATE, LIBRARY]), err));
};

const scan = async (event, paths) => {
  console.log(paths);
  const rawFiles = await Promise.all(
    paths.map(({ path }) => new Promise(resolve => glob(
      '/**/*.?(mp3|flac|wav|ogg)',
      { root: path },
      (err, matches) => resolve(matches)
    )))
  );
  const files = rawFiles.flat();

  readRecursive(event, files, 0);
};

module.exports = {
  scan
};
