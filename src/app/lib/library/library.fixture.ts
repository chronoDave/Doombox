import path from 'path';

import createTokenizer from '../../../utils/tokenizer/kuromoji';
import Parser from '../parser/parser';
import Transliterator from '../transliterator/transliterator';

export default async () => {
  const root = path.resolve(__dirname, '../../../../../node_modules/kuromoji/dict');
  const tokenizer = await createTokenizer(root);
  const transliterator = new Transliterator({ tokenizer });

  return new Parser({ transliterator });
};
