import * as Yup from 'yup';

// Shapes
import { shapeUsername } from '../shapes/userShapes';

export const schemaCreateUser = Yup.object().shape({
  username: shapeUsername
});
