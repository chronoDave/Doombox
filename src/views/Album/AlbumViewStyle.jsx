import createStyles from '@material-ui/core/styles/createStyles'

const AlbumViewStyle = theme => createStyles({
  img: {
    maxWidth: '100%',
    height: 'auto'
  },
  scrollbar: theme.scrollbar
});

export default AlbumViewStyle;
