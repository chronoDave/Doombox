import * as Yup from 'yup';

export const shapeUsername = Yup.string()
  .max(30, 'validation:max')
  .required('validation:required');