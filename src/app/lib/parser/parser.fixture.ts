import path from 'path';

import Tokenizer from '../../../lib/tokenizer/tokenizer';
import Transliterator from '../../../lib/transliterator/transliterator';

import Parser from './parser';

export default async () => {
  const root = path.resolve(__dirname, '../../../../../node_modules/kuromoji/dict');
  const tokenizer = await Tokenizer.create(root);
  const transliterator = new Transliterator(tokenizer);

  return new Parser({ transliterator });
};
