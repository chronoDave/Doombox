import * as Yup from 'yup';

// Shapes
import { shapeUsername } from '../shapes/userShapes';

export const schemaUpdateUser = Yup.object().shape({
  username: shapeUsername
});
