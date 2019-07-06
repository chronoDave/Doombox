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
  }
});

export default FieldSelectStyle;
