import path from 'path';

import Tokenizer from '../tokenizer/tokenizer';

import Transliterator from './transliterator';

export default async () => {
  const root = path.resolve(__dirname, '../../../../node_modules/kuromoji/dict');
  const tokenizer = await Tokenizer.create(root);

  return new Transliterator(tokenizer);
};
