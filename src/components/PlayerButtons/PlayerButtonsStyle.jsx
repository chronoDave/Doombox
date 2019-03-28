import createStyles from '@material-ui/core/styles/createStyles';

const PlayerButtonsStyle = theme => createStyles({
  root: {
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.grey[0]
  },
  volumeContainer: {
    padding: `0 12px`
  },
  volumeIcon: {
    color: theme.palette.grey[0],
    fontSize: '1rem',
    marginRight: theme.spacing.unit
  }
});

export default PlayerButtonsStyle;
