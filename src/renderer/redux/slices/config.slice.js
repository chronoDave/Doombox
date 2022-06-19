import { CONFIG } from '../../../config';
import { createReduxSlice } from '../utils';

const reducers = {
  setConfig: (_, payload) => payload
};

export default createReduxSlice('config', CONFIG, reducers);
