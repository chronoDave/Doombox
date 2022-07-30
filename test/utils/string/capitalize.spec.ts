import test from 'tape';

import { capitalize } from 'src/utils/string';

test('[string.capitalize] shoud capitalize string', t => {
  t.equal(
    capitalize('test'),
    'Test',
    'capitalizes string'
  );

  t.end();
});
