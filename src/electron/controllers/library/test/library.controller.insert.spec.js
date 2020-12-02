const test = require('tape');
const fs = require('fs');

const { createMockElectronEvent } = require('../../../../../test/mock');

const {
  setup,
  cleanup,
  imageFolder,
  songFolder,
  songFile,
  albumFile,
  labelFile,
  imageFile
} = require('./_utils');

test('[library.controller.insert] should create library', async t => {
  const controller = setup({ folder: imageFolder });
  const mockEvent = createMockElectronEvent();

  try {
    await controller.insert(mockEvent, { payload: songFolder });

    t.equal(mockEvent.sender.send.callCount, 1, 'calls interrupt');
    t.equal(fs.readFileSync(songFile, 'utf-8').split('\n').length, 1, 'persists song data');
    t.equal(fs.readFileSync(albumFile, 'utf-8').split('\n').length, 1, 'persists album data');
    t.equal(fs.readFileSync(labelFile, 'utf-8').split('\n').length, 1, 'persists label data');
    t.equal(fs.readFileSync(imageFile, 'utf-8').split('\n').length, 1, 'persists image data');

    const image = JSON.parse(fs.readFileSync(imageFile, 'utf-8').split('\n')[0]).file;

    t.true(fs.existsSync(image), 'creates image');
    t.equal(
      fs.readFileSync(image, 'hex').slice(0, 8),
      '89504e47', // PNG magic number
      'creates valid image'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
