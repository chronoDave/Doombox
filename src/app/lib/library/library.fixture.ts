import fs from 'fs';
import LeafDB from 'leaf-db';
import path from 'path';

import Tokenizer from '../../../lib/tokenizer/tokenizer';
import Transliterator from '../../../lib/transliterator/transliterator';
import Parser from '../parser/parser';

import Library from './library';

export default async () => {
  const root = path.resolve(__dirname, 'tmp');
  const tokenizer = await Tokenizer.create(path.resolve(__dirname, '../../../../../node_modules/kuromoji/dict'));
  const transliterator = new Transliterator(tokenizer);
  const library = new Library({
    root,
    db: { song: new LeafDB(), album: new LeafDB(), label: new LeafDB() },
    parser: new Parser({ transliterator })
  });

  return {
    library,
    root,
    cleanup: () => fs.rmSync(root, { recursive: true })
  };
};
