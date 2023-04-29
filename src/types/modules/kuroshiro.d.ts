/* eslint-disable @typescript-eslint/naming-convention */
declare module 'kuroshiro' {
  export type Syllabary = 'hiragana' | 'katakana' | 'romaji';

  export type Mode = 'normal' | 'spaced' | 'okurigana' | 'furigana';

  export type RomajiSystem = 'nippon' | 'passport' | 'hepburn';

  export type ConvertOptions = {
    to?: Syllabary
    mode?: Mode
    romajiSystem?: RomajiSystem
    delimiter_start?: string
    delimiter_end?: string
  };

  export class Kuroshiro {
    init(analyzer: KuromojiAnalyzer): Promise<void>;
    convert(str: string, options?: ConvertOptions): Promise<string>;
    static Util: {
      isHiragana(char: string): boolean,
      isKana(char: string): boolean,
      isKanji(char: string): boolean,
      isJapanese(char: string): boolean,
      hasHiragana(str: string): boolean,
      hasKatakana(str: string): boolean,
      hasKana(str: string): boolean,
      hasKanji(str: string): boolean,
      hasJapanese(str: string): boolean,
      kanaToHiragna(str: string): string,
      kanaToKatakana(str: string): string,
      kanaToRomaji(str: string, system: RomajiSystem): string
    };
  }

  export = Kuroshiro;
}
