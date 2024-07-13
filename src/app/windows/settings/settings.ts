import Window from '../../lib/window/window';

export default (root: string) => new Window({
  id: 'settings',
  title: 'Settings - Doombox',
  root
});
