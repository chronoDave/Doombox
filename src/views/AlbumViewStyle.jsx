const AlbumViewStyle = theme => ({
  root: {
    height: '100%',
    paddingLeft: theme.spacing.unit * 4
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
