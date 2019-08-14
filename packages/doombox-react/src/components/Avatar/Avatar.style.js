import { makeStyles } from '@material-ui/core/styles';

export const useAvatarStyle = makeStyles(theme => ({
  root: {
    width: 120,
    height: 120,
    color: theme.palette.grey[50],
    border: theme.border(theme.palette.grey[600])
  }
}));
