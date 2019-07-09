import * as Yup from 'yup';

const SchemaCreateProfile = Yup.object().shape({
  username: Yup.string()
    .max(30, 'validation:max')
    .required('validation:required')
});

export default SchemaCreateProfile;
