import { render } from 'inferno';
import { Provider } from 'inferno-redux';

import App from './modules/App';
import Theme from './theme';
import store from './redux';

import './scss/index.scss';

Theme.fetch();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
