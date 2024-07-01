import test from 'tape';

import fixture from './transliterator.fixture';

test('[transliterator.tokenizeKanji]', async t => {
  const transliterator = await fixture();

  t.equal(
    transliterator.transliterate('祖堅 正慶'),
    'soken seikei',
    'transliterates kanji'
  );

  t.equal(
    transliterator.transliterate('梶浦 由記'),
    'kajiura yuki',
    'transliterates kanji'
  );

  t.end();
});

test('[transliterator.transliterate]', async t => {
  const transliterator = await fixture();

  t.equal(
    transliterator.transliterate('全部僕が悪い 〜A Friend〜'),
    'zenbuboku ga waru i 〜 A Friend 〜',
    'transliterates mixed Japanese'
  );

  t.end();
});

test('[transliterator.transliterate]', async t => {
  const transliterator = await fixture();

  t.equal(
    transliterator.transliterate('考え🤔'),
    'kou e 🤔',
    'ignores non-Japanese characters'
  );

  t.end();
});
