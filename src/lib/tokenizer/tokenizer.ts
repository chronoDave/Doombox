import kuromoji from 'kuromoji';

export default class Tokenizer {
  private readonly _tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>;

  private constructor(tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>) {
    this._tokenizer = tokenizer;
  }

  private static _createTokenizer(root: string) {
    return new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>((resolve, reject) => kuromoji
      .builder({ dicPath: root })
      .build((err, x) => {
        if (err) return reject(err);
        return resolve(x);
      }));
  }

  static async create(root: string): Promise<Tokenizer> {
    const tokenizer = await Tokenizer._createTokenizer(root);
    return new Tokenizer(tokenizer);
  }

  tokenize(kanji: string): string[] {
    return this._tokenizer.tokenize(kanji)
      .reduce<string[]>((acc, cur) => {
        if (cur.reading) acc.push(cur.reading);
        return acc;
      }, []);
  }
}
