import createStyles from '@material-ui/core/styles/createStyles';

const PlaylistViewStyle = theme => createStyles({
  root: {
    height: '100%',
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  scrollbar: theme.scrollbar,
  list: {
    backgroundColor: theme.palette.getAlpha(theme.palette.grey[500], 0.9)
  },
});

export default PlaylistViewStyle;
