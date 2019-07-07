const FieldSelectStyle = theme => ({
  hidden: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  label: {
    display: 'inline-block',
    // Accessibility
    cursor: 'pointer'
  },
  error: {
    color: theme.palette.error.main
  },
  root: {
    position: 'relative'
  },
  fieldSelectIcon: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    left: 80,
    bottom: 80,
    zIndex: 1,
    color: theme.palette.grey[0],
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
});

export default FieldSelectStyle;
