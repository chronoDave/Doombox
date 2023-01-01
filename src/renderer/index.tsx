import * as forgo from 'forgo';

import App from './modules/app/app';
import './scss/fonts.scss';
import './scss/reset.scss';
import './scss/theme.scss';

forgo.mount(<App />, document.body);
