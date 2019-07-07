import * as Yup from 'yup';

export const schemaImage = Yup.object().shape({
  lastModified: Yup.number()
    .positive('lastModified must be positive')
    .integer('lastModified must be an integer'),
  lastModifiedDate: Yup.date()
    .isValid('Invalid date format'),
  name: Yup.string(),
  path: Yup.string()
    .url('path is not an url')
    .required('path is required'),
  size: Yup.number()
    .positive('size must be positive')
    .integer('size must be an integer'),
  type: Yup.string()
});
