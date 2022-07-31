import m from 'mithril';

import './index.scss';

window.electronApi.getTheme('darkTheme')
  .then(console.log)
  .catch(console.error);

m.mount(document.body, {
  view: () => [
    <div className='body'>
      Doombox
    </div>
  ]
});
