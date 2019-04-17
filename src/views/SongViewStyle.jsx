import createStyles from '@material-ui/core/styles/createStyles';

const SongViewStyle = theme => createStyles({
  root: {
    height: '100%',
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  scrollbar: theme.scrollbar,
  list: {
    backgroundColor: theme.palette.getAlpha(theme.palette.grey[500], 0.9)
  },
  header: {
    padding: theme.spacing.unit * 2
  },
  grid: {
    padding: theme.spacing.unit * 2
  },
  listHeader: {
    height: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: theme.palette.getAlpha(theme.palette.grey[500], 0.9)
  },
  duration: {
    maxWidth: 60
  },
  listItemText: {
    marginRight: theme.spacing.unit * 2
  },
  icon: {
    color: theme.palette.grey[50]
  },
});

export default SongViewStyle;
