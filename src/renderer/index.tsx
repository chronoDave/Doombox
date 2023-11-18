import * as forgo from 'forgo';
import { enableMapSet } from 'immer';

import Window from './modules/window/window';

enableMapSet();
forgo.mount(<Window />, document.body);
