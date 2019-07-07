const FieldStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.dark}`,
    borderRadius: theme.shape.borderRadius
  },
  icon: {
    color: theme.palette.grey[0],
    marginRight: theme.spacing(1)
  }
});

export default FieldStyle;
