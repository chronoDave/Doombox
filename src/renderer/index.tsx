import * as forgo from 'forgo';
import { enableMapSet } from 'immer';

import App from './modules/app/app';

enableMapSet();
forgo.mount(<App />, document.body);
