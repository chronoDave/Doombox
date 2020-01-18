import { makeStyles } from '@material-ui/core/styles';

export const useVirtualStyles = makeStyles(theme => ({
  image: {
    width: '100%'
  },
  inset: {
    paddingLeft: theme.spacing(2)
  },
  active: {
    backgroundColor: theme.palette.primary.main
  },
  block: {
    display: 'block'
  },
  itemTrack: {
    minWidth: theme.spacing(4)
  },
  listItemIcon: {
    minWidth: theme.spacing(5)
  }
}));
