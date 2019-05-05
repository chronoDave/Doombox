const { app } = require('electron');
const walk = require('walk');
const fs = require('fs');
const mm = require('music-metadata');

module.exports = function populateDatabase(Database, rootFolder, sender) {
  if (!rootFolder) {
    sender.send('RECEIVE_STATUS', {
      payload: `No directory found!`,
      variant: 'error'
    });
    return;
  }
  sender.send('RECEIVE_STATUS', {
    payload: `Starting scan...`,
    variant: 'info'
  });

  // RegEx
  const reSong = RegExp(/(.*.mp3|.*.flac|.*.ogg)/);
  const reImageFormat = RegExp(/([^/]*.$)/);

  // Create directory
  const walker = walk.walk(rootFolder);
  const imageDir = process.platform === 'win32'
    ? `${app.getPath('userData')}\\images`
    : `${app.getPath('userData')}/images`;
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

  // Payloads
  const payloadSong = new Set();
  const batchSizeSong = 1000;
  let batchCounterSong = 0;

  let iterationSong = 1;
  walker.on('file', (root, fileStats, next) => {
    const song = reSong.test(fileStats.name) ? reSong.exec(fileStats.name)[1] : false;

    // Check if not album file
    if (song) {
      const url = process.platform === 'win32'
        ? `${root}\\${song}`
        : `${root}/${song}`;

      mm.parseFile(url, { duration: true }).then(metadata => {
        // Validate metadata
        const artist = metadata.common.artist || '???';
        const label = metadata.common.albumartist || '???';
        const album = metadata.common.album || '???';

        let cover;

        // Create image
        if (metadata.common.picture) {
          const imageFormat = reImageFormat.test(metadata.common.picture[0].format)
            ? reImageFormat.exec(metadata.common.picture[0].format)[1]
            : 'jpeg';
          const imagePath = process.platform === 'win32'
            ? `${imageDir}\\${album.replace(/\/|\\|\?|%|\*|:|\||"|<|>|\./g, '')}.${imageFormat}`
            : `${imageDir}/${album.replace(/\/|\\|\?|%|\*|:|\||"|<|>|\./g, '')}.${imageFormat}`

          // Save file to disk
          fs.writeFileSync(imagePath, metadata.common.picture[0].data, 'base64');

          cover = imagePath;
        }

        const songData = {
          title: metadata.common.title,
          artist,
          album,
          year: metadata.common.year,
          track: metadata.common.track.no,
          label,
          duration: metadata.format.duration * 1000,
          cover,
          url
        };

        // Songs
        payloadSong.add(songData);
        batchCounterSong += 1;
        if (batchCounterSong > batchSizeSong) {
          Database.songs.insert(Array.from(payloadSong), err => {
            if (err && err.errorType !== 'uniqueViolated') {
              throw Error(`Error whilst inserting songs: ${err}`);
            } else {
              sender.send('RECEIVE_STATUS', {
                payload: `Successfully inserted ${batchSizeSong * iterationSong} songs`,
                variant: 'info'
              });
            }
            iterationSong += 1;
          });
          // Clear payload & reset counter
          batchCounterSong = 0;
          payloadSong.clear();
        }
      });
    }
    next();
  });

  walker.on('errors', (root, nodeStatsArray, next) => next());

  walker.on('end', () => {
    Database.songs.insert(Array.from(payloadSong), err => {
      if (err) {
        if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting SONGS: ${err}`);
        sender.send('RECEIVE_STATUS', {
          payload: `Duplicates found in last ${batchCounterSong} SONGS, moving on...`,
          variant: 'warning'
        });
      } else {
        sender.send('RECEIVE_STATUS', {
          payload: `Scanning complete! Batch inserted the remaining ${batchCounterSong} songs`,
          variant: 'success'
        });
      }
      sender.send('RECEIVE_DATABASE_CREATED');
    });
  });
};
