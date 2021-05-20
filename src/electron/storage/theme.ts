import * as yup from 'yup';
import { UserTheme } from '@doombox-types';

import Storage from './storage';

const schema = yup.object({
  dark: yup.boolean().default(true)
});

export default (root: string) => new Storage<UserTheme>(root, 'theme', schema);
