import * as Yup from 'yup';

// Shapes
import {
  shapeUsername,
  shapeUrlMongoDb
} from '../shapes/userShapes';

export const schemaCreateUser = Yup.object().shape({
  username: shapeUsername,
  connection: shapeUrlMongoDb
});
