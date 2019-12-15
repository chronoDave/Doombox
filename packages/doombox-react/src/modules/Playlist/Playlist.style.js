import { makeStyles } from '@material-ui/core/styles';

export const usePlaylistStyles = makeStyles(theme => ({
  noWrap: {
    width: '100%',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },
  active: {
    backgroundColor: theme.palette.primary.main
  },
  listItemIcon: {
    minWidth: theme.spacing(5)
  }
}));
