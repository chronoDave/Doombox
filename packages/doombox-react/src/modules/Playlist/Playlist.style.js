import { makeStyles } from '@material-ui/core/styles';

export const usePlaylistStyles = makeStyles(theme => ({
  block: {
    display: 'block'
  },
  active: {
    backgroundColor: theme.palette.primary.main
  },
  listItemIcon: {
    minWidth: theme.spacing(5)
  }
}));
