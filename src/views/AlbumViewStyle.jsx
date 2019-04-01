import createStyles from '@material-ui/core/styles/createStyles'

const AlbumViewStyle = theme => createStyles({
  root: {
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 8,
    width: 'fit-content'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  },
  icon: {
    color: theme.palette.grey[50]
  },
  scrollbar: theme.scrollbar
});

export default AlbumViewStyle;
