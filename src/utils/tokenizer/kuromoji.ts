import kuromoji from 'kuromoji';

export default async (root: string) =>
  new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>((resolve, reject) => kuromoji
    .builder({ dicPath: root })
    .build((err, x) => {
      if (err) return reject(err);
      return resolve(x);
    }));
