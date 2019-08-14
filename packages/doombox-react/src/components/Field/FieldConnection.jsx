// import React, { useState } from 'react';
// import { Field } from 'formik';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// // Core
// import { withStyles } from '@material-ui/core/styles';
// import {
//   Box,
//   TextField,
//   FormControlLabel,
//   Switch,
//   Grow
// } from '@material-ui/core';

// import {
//   IconDatabaseRefresh,
//   IconDatabaseRemove,
//   IconDatabaseCheck,
//   IconDatabase
// } from '../Icon';

// // Style
// import FieldStyle from './FieldStyle';

// const FieldConnection = props => {
//   const {
//     classes,
//     context,
//     name,
//     id,
//     error,
//     pending,
//     disabled,
//     children,
//     isConnected,
//   } = props;
//   const { t } = useTranslation();

//   const getEndAdornment = () => {
//     if (error) return <IconDatabaseRemove classes={{ root: classes.iconDatabaseError }} />;
//     if (pending) return <IconDatabaseRefresh />;
//     if (isConnected) return <IconDatabaseCheck classes={{ root: classes.iconDatabaseCheck }} />;
//     return <IconDatabase />;
//   };

//   return (
//     <Field
//       name={name}
//       render={({
//         field: { value },
//         form: {
//           setFieldValue,
//           setFieldTouched,
//           touched,
//           errors
//         }
//       }) => (
//         <Box display="flex" flexDirection="column" alignItems="center">
//           <FormControlLabel
//             label={t('description:remote')}
//             control={(
//               <Switch
//                 color="primary"
//                 checked={value}
//                 onChange={() => {
//                   setFieldValue(name, !value);
//                   setFieldTouched(name, true);
//                 }}
//               />
//             )}
//           />
//         </Box>

//         // <Box display="flex" flexDirection="column" alignItems="center">
//         //   <TextField
//         //     inputProps={{ id: `${id}-${name}` }}
//         //     InputProps={{
//         //       endAdornment: getEndAdornment(),
//         //       classes: { disabled: classes.inputPropsDisabled }
//         //     }}
//         //     InputLabelProps={{
//         //       classes: { disabled: classes.inputLabelPropsDisabled }
//         //     }}
//         //     label={t('url')}
//         //     variant="outlined"
//         //     fullWidth
//         //     margin="normal"
//         //     disabled={disabled}
//         //     error={
//         //       (!!errors[name] && touched[name]) ||
//         //       (error && touched[name])
//         //     }
//         //     helperText={t(errors[name], { input: t(name), context })}
//         //     value={value}
//         //     onChange={event => {
//         //       setFieldValue(name, event.target.value);
//         //       setFieldTouched(name, true);
//         //     }}
//         //   />
//         //   <Box display="flex" width="100%" py={1}>
//         //     {children}
//         //   </Box>
//         // </Box>
//       )}
//     />
//   );
// };

// const mapStateToProps = state => ({
//   pending: state.system.pendingDatabase,
//   error: state.system.error,
//   isConnected: state.system.connectedDatabase
// });

// export default connect(
//   mapStateToProps
// )(withStyles(
//   FieldStyle
// )(FieldConnection));
