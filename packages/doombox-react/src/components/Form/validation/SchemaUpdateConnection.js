import * as Yup from 'yup';

// Shapes
import { shapeConnection } from './SchemaShapes';

export const SchemaUpdateConnection = Yup.object().shape({
  connection: shapeConnection
});
