import * as forgo from 'forgo';
import { enableMapSet } from 'immer';

import App from './ui/app/app';

enableMapSet();
document.body.classList.add('App');
forgo.mount(<App />, document.body);
