import * as Yup from 'yup';

// Shapes
import { shapeUrlMongoDb } from '../shapes/userShapes';

export const schemaUpdateConnection = Yup.object().shape({
  connection: shapeUrlMongoDb
});
