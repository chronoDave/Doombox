import * as Yup from 'yup';

export const SchemaCreateUser = Yup.object().shape({
  username: Yup.string()
    .max(30, 'validation:max')
    .required('validation:required'),
  connection: Yup.string()
    .matches(/mongodb:\/\//i, 'validation:url')
    .required('validation:required')
});
