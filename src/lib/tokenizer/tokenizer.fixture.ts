import path from 'path';

import Tokenizer from './tokenizer';

export default () => Tokenizer.create(path.resolve(__dirname, '../../../../node_modules/kuromoji/dict'));
