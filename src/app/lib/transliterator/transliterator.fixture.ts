import path from 'path';

import createTokenizer from '../tokenizer/tokenizer';

import Transliterator from './transliterator';

export default async () => {
  const root = path.resolve(__dirname, '../../../../../node_modules/kuromoji/dict');
  const tokenizer = await createTokenizer(root);

  return new Transliterator({ tokenizer });
};
