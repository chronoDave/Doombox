/* eslint-disable max-len */
const { app } = require('electron');
const walk = require('walk');
const fs = require('fs');
const mm = require('music-metadata');

module.exports = function populateDatabase(Database, rootFolder) {
  if (!rootFolder) {
    console.log('ERROR: No directory found!');
    return;
  }
  console.log('WALKER: Starting scan...');

  // RegEx
  const reSong = RegExp(/(.*.mp3|.*.flac)/);
  const reImageFormat = RegExp(/([^/]*.$)/);

  // Create directory
  const walker = walk.walk(rootFolder);
  const imageDir = process.platform === 'win32'
    ? `${app.getPath('userData')}\\images`
    : `${app.getPath('userData')}/images`;
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

  // Payloads
  const payloadSong = new Set();
  const payloadAlbum = new Set();
  const payloadLabel = new Set();
  const batchSizeSong = 500;
  const batchSizeAlbum = 25;
  const batchSizeLabel = 10;
  let batchCounterSong = 0;
  let batchCounterAlbum = 0;
  let batchCounterLabel = 0;
  let iterationSong = 1;
  let iterationAlbum = 1;
  let iterationLabel = 1;
  let prevAlbumId = false;
  let prevLabelId = false;

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

        const songId = `${album}-${song}`;
        const albumId = `${label}-${album}`;

        let cover;

        // Create image
        if (metadata.common.picture) {
          const imageFormat = reImageFormat.test(metadata.common.picture[0].format)
            ? reImageFormat.exec(metadata.common.picture[0].format)[1]
            : 'jpeg';
          const imagePath = `${imageDir}\\${album.replace(/\/|\\|\?|%|\*|:|\||"|<|>|\./g, '')}.${imageFormat}`.replace(/\s/g, '_');

          // Save file to disk
          fs.writeFileSync(imagePath, metadata.common.picture[0].data, 'base64');

          cover = imagePath;
        }

        // Songs
        payloadSong.add({
          _id: songId,
          albumId,
          url,
          cover,
          artist,
          album,
          title: metadata.common.title,
          year: metadata.common.year,
          track: metadata.common.track.no,
          duration: metadata.format.duration * 1000
        });
        batchCounterSong += 1;
        if (batchCounterSong > batchSizeSong) {
          Database.songs.insert(Array.from(payloadSong), err => {
            if (err) {
              if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting SONGS: ${err}`);
              console.log(`[${new Date().toLocaleTimeString()}] Duplicates found between, moving on...`);
            } else {
              console.log(`[${new Date().toLocaleTimeString()}] Batch inserted ${batchSizeSong * iterationSong} SONGS`);
            }
            iterationSong += 1;
          });
          // Clear payload & reset counter
          batchCounterSong = 0;
          payloadSong.clear();
        }

        // Albums
        if (prevAlbumId !== albumId) {
          if (batchCounterAlbum > batchSizeAlbum) {
            Database.albums.insert(Array.from(payloadAlbum), err => {
              if (err) {
                if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting ALBUMS: ${err}`);
                console.log(`[${new Date().toLocaleTimeString()}] Duplicates found between ${Array.from(payloadAlbum)[0]._id} and ${Array.from(payloadAlbum)[Array.from(payloadAlbum).length - 1]._id}, moving on...`);
              } else {
                console.log(`[${new Date().toLocaleTimeString()}] Batch inserted ${batchSizeAlbum * iterationAlbum} ALBUMS`);
              }
              iterationAlbum += 1;
            });
            // Clear payload & reset counter
            batchCounterAlbum = 0;
            payloadAlbum.clear();
          }
          payloadAlbum.add({
            _id: albumId,
            name: album,
            label,
            cover,
            year: metadata.common.year,
            songs: []
          });
          batchCounterAlbum += 1;
        }
        prevAlbumId = albumId;
        payloadAlbum.forEach(item => item._id === albumId && item.songs.push(songId));

        // Labels
        if (prevLabelId !== label) {
          if (batchCounterLabel > batchSizeLabel) {
            Database.labels.insert(Array.from(payloadLabel), err => {
              if (err) {
                if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting LABELS: ${err}`);
                console.log(`[${new Date().toLocaleTimeString()}] Duplicates found between ${Array.from(payloadLabel)[0]._id} and ${Array.from(payloadLabel)[Array.from(payloadLabel).length - 1]._id}, moving on...`);
              } else {
                console.log(`[${new Date().toLocaleTimeString()}] Batch inserted ${batchSizeLabel * iterationLabel} ALBUMS`);
              }
              iterationLabel += 1;
            });
            // Clear payload & reset counter
            batchCounterLabel = 0;
            payloadLabel.clear();
          }
          payloadLabel.add({
            _id: label,
            name: label,
            albums: []
          });
          batchCounterLabel += 1;
        }
        prevLabelId = label;
        payloadLabel.forEach(item => item._id === label && item.albums.push(albumId));

        next();
      });
    }
    next();
  });

  walker.on('errors', (root, nodeStatsArray, next) => next());

  walker.on('end', () => {
    Database.songs.insert(Array.from(payloadSong), err => {
      if (err) {
        if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting SONGS: ${err}`);
        console.log(`[${new Date().toLocaleTimeString()}] Duplicates found in last ${batchCounterSong} SONGS, moving on...`);
      } else {
        console.log(`[${new Date().toLocaleTimeString()}] Batch inserted final ${batchCounterSong} SONGS`);
      }
    });
    Database.albums.insert(Array.from(payloadAlbum), err => {
      if (err) {
        if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting ALBUMS: ${err}`);
        console.log(`[${new Date().toLocaleTimeString()}] Duplicates found in last ${batchCounterAlbum} ALBUMS, moving on...`);
      } else {
        console.log(`[${new Date().toLocaleTimeString()}] Batch inserted final ${batchCounterAlbum} ALBUMS`);
      }
      iterationAlbum += 1;
    });
    Database.labels.insert(Array.from(payloadLabel), err => {
      if (err) {
        if (err.errorType !== 'uniqueViolated') throw Error(`Error when inserting LABELS: ${err}`);
        console.log(`[${new Date().toLocaleTimeString()}] Duplicates found in last ${batchCounterLabel} LABELS, moving on...`);
      } else {
        console.log(`[${new Date().toLocaleTimeString()}] Batch inserted final ${batchCounterLabel} LABELS`);
      }
      iterationAlbum += 1;
    });
    console.log('WALKER: Finished scan!');
  });
};
