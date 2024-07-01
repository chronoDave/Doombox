import type Tokenizer from '../tokenizer/tokenizer';

import * as wanakana from 'wanakana';

export default class Transliterator {
  private readonly _tokenizer: Tokenizer;

  constructor(tokenizer: Tokenizer) {
    this._tokenizer = tokenizer;
  }

  tokenizeKanji(kanji: string) {
    return this._tokenizer.tokenize(kanji)
      .map(token => wanakana.toRomaji(token))
      .join('');
  }

  transliterate(x: string) {
    return wanakana.tokenize(x)
      .map(token => {
        if (token.trim().length === 0) return null;
        if (wanakana.isRomaji(token)) return token;
        if (wanakana.isKana(token)) return wanakana.toRomaji(token);
        if (wanakana.isKanji(token)) return this.tokenizeKanji(token);
        return token;
      })
      .filter(y => y)
      .join(' ');
  }
}
