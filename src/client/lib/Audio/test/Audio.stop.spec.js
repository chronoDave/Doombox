const test = require('tape');

const setup = require('./_utils');

test('[Audio.stop] should stop', t => {
  const audio = setup();

  audio.stop();
  t.false(
    audio.instance,
    'removes instance'
  );

  t.end();
});
