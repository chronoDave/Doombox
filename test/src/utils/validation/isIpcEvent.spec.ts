import test from 'tape';

import { IpcAction } from '../../../../src/types/ipc';
import { isIpcEvent } from '../../../../src/utils/validation';

test('[validation.isIpcEvent] should return true if ipcEvent', t => {
  t.true(isIpcEvent({ action: IpcAction.Get, payload: {} }), 'ipcEvent');

  t.end();
});

test('[validation.isIpcEvent] should return false if not ipcEvent', t => {
  t.false(isIpcEvent({ action: IpcAction.Get }), 'empty payload');
  t.false(isIpcEvent({ action: 'Get' }), 'invalid action');

  t.end();
});
