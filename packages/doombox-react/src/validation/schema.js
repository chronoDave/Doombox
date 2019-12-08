import * as Yup from 'yup';

import { shapeUsername } from './shapes';

export const schemaCreatePlaylist = Yup.object().shape({
  name: shapeUsername
});
