import test from 'tape';

import { pascalize } from 'src/utils/string';

test('[string.pascalize] should pascalize string', t => {
  t.equal(
    pascalize('original string'),
    'Original String',
    'pascalizes string'
  );

  t.end();
});
