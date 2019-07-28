import * as Yup from 'yup';

// Shapes
import { shapeMongoDb } from './SchemaShapes';

export const SchemaUpdateConnection = Yup.object().shape({
  connection: shapeMongoDb
});
