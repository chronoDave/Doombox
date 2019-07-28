import * as Yup from 'yup';

// Shapes
import { shapeUsername } from './SchemaShapes';

export const SchemaUpdateUser = Yup.object().shape({
  username: shapeUsername
});
