import * as Yup from 'yup';

const SchemaUser = Yup.object().shape({
  username: Yup.string()
    .max(30, 'validation:max')
    .required('validation:required')
});

export default SchemaUser;
