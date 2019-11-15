import { makeStyles } from '@material-ui/core';

export const useSidebarStyle = makeStyles(theme => ({
  paper: {
    width: theme.component.sidebar,
    backgroundColor: theme.palette.grey[600],
  },
  iconRoot: {
    color: theme.palette.grey[50]
  },
  iconPlaylist: {
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%'
  }
}));
