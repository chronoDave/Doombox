const test = require('tape');

const setup = require('./_utils');

test('[Audio.seek] should ignore if instance does not exist', t => {
  const audio = setup(true);

  audio.seek();
  t.pass('does not call instance functions');

  t.end();
});

test('[Audio.seek] should seek', t => {
  const audio = setup();
  const vSeek = 3;

  audio.seek(vSeek);
  t.true(
    audio.instance.seek.calledOnce,
    'calls seek'
  );

  t.end();
});
