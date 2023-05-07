import * as forgo from 'forgo';

import Menu from './menu';

export default () => {
  forgo.mount([
    <Menu
      id='menu'
      popup={{ position: 'left' }}
      items={[
        { label: '1', onclick: () => { } },
        { label: '2', onclick: () => { }, disableAutoclose: true }
      ]}
    >
      Menu
    </Menu>,
    <div id="test">
      Test
    </div>
  ], document.body);

  return () => forgo.unmount(document.body);
};
