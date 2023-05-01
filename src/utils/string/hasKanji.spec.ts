import test from 'tape';

import hasKanji from './hasKanji';

test('[hasKanji] returns true if string contains kanji', t => {
  t.true(hasKanji('刀'), 'kanji');
  t.true(hasKanji('切腹'), 'multiple kanji');
  t.true(hasKanji('勢い'), 'kanji & hiragana');

  t.end();
});

test('[hasKanji] returns false if string does not contain kanji', t => {
  t.false(hasKanji('🐸'), 'emoji');
  t.false(hasKanji('あAア'), 'hiragana & katakana');

  t.end();
});
