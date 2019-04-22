const LabelItemStyle = theme => ({
  root: {
    margin: `0 ${theme.spacing.unit}px`,
    backgroundColor: theme.palette.grey[500],
    height: '100%',
    maxHeight: 330 - theme.spacing.unit,
    boxShadow: theme.shadows[3]
  },
  icon: {
    color: theme.palette.grey[50],
  },
  textContainer: {
    height: theme.spacing.unit * 7,
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2
  },
  iconContainer: {
    // marginTop: theme.spacing.unit * 2,
    height: theme.spacing.unit * 6
  },
  headerContainer: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  albumContainer: {
    overflowY: 'auto',
    marginTop: theme.spacing.unit,
    height: 330 - theme.spacing.unit * 15 - 2,
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  albumItemRoot: {
    width: 120,
    margin: theme.spacing.unit
  },
  scrollbar: theme.scrollbar
});

export default LabelItemStyle;
