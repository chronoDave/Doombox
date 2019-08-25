const {
  create,
  LIBRARY,
  MESSAGE,
  CREATE,
  ERROR,
  SUCCESS
} = require('@doombox/utils/types');
const glob = require('glob');

// Parser
const { parseID3 } = require('../../../lib/parser');
const nedbController = require('../../system/controllers/nebdController');

const batchSize = 50;

const readRecursive = (event, files, iteration = 0) => {
  if (!Array.isArray(files)) return event.sender.send(create([ERROR, CREATE, LIBRARY]), 'Files is not an array');
  const batches = Math.ceil(files.length / batchSize);

  const offset = batchSize * iteration;

  return Promise.all(files.slice(
    offset,
    offset + batchSize
  ).map(file => parseID3(file, { parseImage: true })))
    .then(async data => {
      if (iteration < batches) {
        event.sender.send(MESSAGE, { current: iteration + 1, total: batches });

        await nedbController.create('library', data);

        readRecursive(event, files, iteration + 1);
      } else {
        const payload = await nedbController.read('library');
        event.sender.send(create([SUCCESS, CREATE, LIBRARY]), payload);
      }
    })
    .catch(err => {
      event.sender.send(create([ERROR, CREATE, LIBRARY]), err);
    });
};

const scan = async (event, paths) => {
  await nedbController.drop('library');
  await nedbController.drop('images');

  const rawFiles = await Promise.all(
    paths.map(({ path }) => new Promise(resolve => glob(
      '/**/*.?(mp3)',
      { root: path },
      (err, matches) => resolve(matches)
    )))
  );
  const files = rawFiles.flat();

  readRecursive(event, files);
};

module.exports = {
  scan
};
