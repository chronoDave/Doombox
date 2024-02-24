import path from 'path';

import createTokenizer from '../../../lib/tokenizer/kuromoji';
import Transliterator from '../transliterator/transliterator';

import Parser from './parser';

export default async () => {
  const root = path.resolve(__dirname, '../../../../../node_modules/kuromoji/dict');
  const tokenizer = await createTokenizer(root);
  const transliterator = new Transliterator({ tokenizer });

  return new Parser({ transliterator });
};
