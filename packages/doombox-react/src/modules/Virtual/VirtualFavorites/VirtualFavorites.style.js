import { makeStyles, fade } from '@material-ui/core/styles';

export const useVirtualFavoritesStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  // Item
  itemActive: {
    backgroundColor: fade(theme.palette.primary.main, 0.4)
  },
  itemActiveBar: {
    position: 'absolute',
    width: theme.spacing(0.5),
    height: '100%',
    left: 0,
    backgroundColor: theme.palette.primary[theme.palette.type === 'dark' ? 'main' : 'light']
  },
  itemTrack: {
    minWidth: theme.spacing(6),
    paddingLeft: theme.spacing(1.5)
  }
}));
