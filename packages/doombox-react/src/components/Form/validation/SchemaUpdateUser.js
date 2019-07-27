import * as Yup from 'yup';

export const SchemaUpdateUser = Yup.object().shape({
  username: Yup.string()
    .max(30, 'validation:max')
    .required('validation:required'),
});
