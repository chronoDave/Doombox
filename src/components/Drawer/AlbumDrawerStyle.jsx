const AlbumDrawerStyle = theme => ({
  root: {
    width: '50%',
    maxWidth: theme.spacing.component.albumDrawer,
    backgroundColor: theme.palette.grey[500]
  },
  light: {
    fontWeight: 300,
    color: theme.palette.getAlpha(theme.palette.grey[100], 0.75)
  },
  listItemTitle: {
    padding: theme.spacing.unit * 3,
    paddingBottom: 0
  },
  listItemButtons: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  icon: {
    color: theme.palette.grey[50]
  },
  listItemSong: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  listItemSongIcon: {
    padding: 0,
    margin: 0
  },
  subtitle: {
    fontWeight: 300,
    color: theme.palette.getAlpha(theme.palette.grey[100], 0.5)
  },
  active: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  scrollbar: theme.scrollbar
});

export default AlbumDrawerStyle;
