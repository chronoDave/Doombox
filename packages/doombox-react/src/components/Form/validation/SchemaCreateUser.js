import * as Yup from 'yup';

// Shapes
import {
  shapeUsername,
  shapeConnection
} from './SchemaShapes';

export const SchemaCreateUser = Yup.object().shape({
  username: shapeUsername,
  connection: shapeConnection
});
