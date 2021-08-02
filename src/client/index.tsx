import { render } from 'inferno';

import { App } from './modules/App';
import Theme from './theme';

import './scss/index.scss';

Theme.fetch();

render(
  <App />,
  document.getElementById('root')
);
