import * as Yup from 'yup';

export const shapeUsername = Yup.string()
  .max(30, 'validation:max')
  .required('validation:required');

export const shapeUrlMongoDb = Yup.string()
  .matches(/mongodb:\/\//, 'validation:url')
  .matches(/:\d/, 'validation:port')
  .matches(/\b\/\w/, 'validation:name')
  .required('validation:required');
