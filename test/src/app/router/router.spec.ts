import test from 'tape';

import { IpcAction } from '../../../../src/types/ipc';

import fixture from './fixture';

test('[router] should reject if not ipc event', async t => {
  const { route } = fixture();

  try {
    await route(false);
    t.fail('expected to throw');
  } catch (err) {
    t.ok(err);
  }

  t.end();
});

test('[router] should reject if not valid ipc action', async t => {
  const { route } = fixture();

  try {
    await route({ action: false });
    t.fail('expected to throw');
  } catch (err) {
    t.ok(err);
  }

  t.end();
});

test('[router] should reject if action is not implemented', async t => {
  const { route } = fixture();

  try {
    await route({ action: IpcAction.Set });
    t.fail('expected to throw');
  } catch (err) {
    t.ok(err);
  }

  t.end();
});

test('[router] should resolve if action is implemented', async t => {
  const { route } = fixture();

  try {
    await route({ action: IpcAction.Get });
    t.ok('resolves');
  } catch (err) {
    t.fail((err as Error).message);
  }

  t.end();
});
