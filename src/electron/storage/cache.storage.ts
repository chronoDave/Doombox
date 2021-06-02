import * as yup from 'yup';
import { Cache } from '@doombox-types';

import Storage from './storage';

const schema = yup.object({
  window: yup.object({
    x: yup.number().positive(),
    y: yup.number().positive(),
    width: yup.number().min(320).default(320),
    height: yup.number().min(240).default(240)
  }).required()
});

export default (root: string) => new Storage<Cache>(root, 'cache', schema);
