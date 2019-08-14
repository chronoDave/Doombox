import { makeStyles } from '@material-ui/core/styles';

export const useSidebarItemStyle = makeStyles(theme => ({
  iconSmall: {
    color: theme.palette.grey[50],
    padding: theme.spacing(1)
  },
  avatar: {
    width: 30,
    height: 30
  }
}));
