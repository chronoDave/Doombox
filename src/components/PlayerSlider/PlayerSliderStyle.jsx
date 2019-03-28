import createStyles from '@material-ui/core/styles/createStyles';

const PlayerSliderStyle = theme => createStyles({
  root: {
    marginTop: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit * 4}px`
  },
  track: {
    height: 4,
    backgroundColor: theme.palette.grey[100]
  },
  trackBefore: {
    backgroundColor: theme.palette.grey[50]
  },
  thumb: {
    backgroundColor: theme.palette.grey[600],
    border: `3px solid ${theme.palette.grey[50]}`,
    borderRadius: '50%'
  },
  textContainer: {
    paddingTop: theme.spacing.unit
  }
});

export default PlayerSliderStyle;
