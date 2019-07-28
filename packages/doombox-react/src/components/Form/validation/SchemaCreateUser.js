import * as Yup from 'yup';

// Shapes
import {
  shapeUsername,
  shapeMongoDb
} from './SchemaShapes';

export const SchemaCreateUser = Yup.object().shape({
  username: shapeUsername,
  connection: shapeMongoDb
});
