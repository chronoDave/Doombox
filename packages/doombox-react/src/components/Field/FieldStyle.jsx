const FieldStyle = theme => ({
  menuItemRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  selectMenu: {
    display: 'flex',
    alignItems: 'center'
  },
  iconDatabaseCheck: {
    color: theme.palette.success.main
  },
  iconDatabaseError: {
    color: theme.palette.error.main
  },
  inputLabelPropsDisabled: {
    color: `${theme.palette.success.main} !important`
  },
  inputPropsDisabled: {
    color: `${theme.palette.success.main} !important`,
    '& fieldset': {
      borderColor: `${theme.palette.success.main} !important`
    }
  },
});

export default FieldStyle;
