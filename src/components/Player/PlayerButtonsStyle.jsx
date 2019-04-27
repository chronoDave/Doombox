const PlayerButtonsStyle = theme => ({
  root: {
    color: theme.palette.grey[50],
    padding: 0
  },
  track: {
    height: 2
  },
  thumb: {
    width: 6,
    height: 6
  },
  icon: {
    color: theme.palette.grey[50]
  },
  slider: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  container: {
    height: 30
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

export default PlayerButtonsStyle;
