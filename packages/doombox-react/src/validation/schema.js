import * as Yup from 'yup';

import { shapeUsername } from './shapes';

export const schemaPlaylist = Yup.object().shape({
  name: shapeUsername,
  src: Yup.string()
});
