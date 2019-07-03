import createStyles from '@material-ui/core/styles/createStyles';

const PlaylistViewStyle = theme => createStyles({
  root: {
    height: '100%',
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  scrollbar: theme.scrollbar,
  list: {
    marginLeft: theme.spacing.unit * 2,
    backgroundColor: theme.palette.getAlpha(theme.palette.grey[500], 0.9)
  },
  playlistItem: {
    width: 300,
    height: 'fit-content',
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[500]
  },
  playlistTextContainer: {
    padding: theme.spacing.unit
  },
  textYear: {
    paddingLeft: theme.spacing.unit
  },
  icon: {
    color: theme.palette.grey[50]
  }
});

export default PlaylistViewStyle;
