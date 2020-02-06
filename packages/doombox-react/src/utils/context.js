import { createContext } from 'react';

import { HOOK } from './const';

const createContextObject = contextObject => Object
  .values(contextObject)
  .map(context => ({ [context]: createContext() }))
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export const AudioContext = createContextObject(HOOK.AUDIO);
export const RouteContext = createContextObject(HOOK.ROUTE);
