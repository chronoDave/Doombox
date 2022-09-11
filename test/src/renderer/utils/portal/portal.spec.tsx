import test from 'tape';
import * as forgo from 'forgo';

import portal from '../../../../../src/renderer/utils/portal';

import fixture from './fixture';

test('[portal] should mount component', t => {
  const { cleanup } = fixture();

  portal(document.body, <div id="test" />);

  t.true(document.body.querySelector('#test'));

  cleanup();
  t.end();
});

test('[portal] should unmount component', t => {
  const { cleanup } = fixture();

  const unmount = portal(document.body, <div id="test" />);
  unmount();

  t.false(document.body.querySelector('#test'));

  cleanup();
  t.end();
});

test('[portal] calls component unmount function', t => {
  const { cleanup } = fixture();
  let unmounted = false;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Test = () => {
    const component = new forgo.Component({
      render() {
        return <div id="test" />;
      }
    });

    component.unmount(() => {
      unmounted = true;
    });

    return component;
  };

  const unmount = portal(document.body, <Test />);
  unmount();

  t.true(unmounted);

  cleanup();
  t.end();
});