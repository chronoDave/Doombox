import test from 'tape';

import { isIpcEvent } from '../../../../src/utils/validation';

test('[validation.isIpcEvent] should return true if ipcEvent', t => {
  t.true(isIpcEvent({ action: 'GET', payload: {} }), 'ipcEvent');

  t.end();
});

test('[validation.isIpcEvent] should return false if not ipcEvent', t => {
  t.false(isIpcEvent({ action: 'GET' }), 'empty payload');
  t.false(isIpcEvent({ action: 'Get' }), 'invalid action');

  t.end();
});
