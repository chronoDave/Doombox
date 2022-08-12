import test from 'tape';

import { isIpcEvent } from '../../../../src/utils/validation';

test('[validation.isIpcEvent] should return true if ipcEvent', t => {
  t.true(isIpcEvent({ action: 'Get', payload: {} }), 'ipcEvent');
  t.true(isIpcEvent({ action: 'Get' }), 'empty payload');

  t.end();
});

test('[validation.isIpcEvent] should return false if not ipcEvent', t => {
  t.false(isIpcEvent({ action: 'GET' }), 'invalid action');

  t.end();
});
