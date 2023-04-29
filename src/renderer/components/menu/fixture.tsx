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

  const cleanup = () => forgo.mount(null, document.body);
  const getMenuItems = () => Array.from(document.querySelectorAll('[role=menuitem]')) as HTMLButtonElement[];
  const hasMenuItems = () => getMenuItems().length > 0;

  const menuButton = document.querySelector('button') as HTMLButtonElement;
  const outsideArea = document.querySelector('#test') as HTMLDivElement;

  return ({
    menuButton,
    getMenuItems,
    hasMenuItems,
    outsideArea,
    cleanup
  });
};