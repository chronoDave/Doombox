import { makeStyles } from '@material-ui/core/styles';

export const useAvatarStyle = makeStyles(theme => ({
  root: {
    color: theme.palette.grey[50]
  },
  small: {
    width: 36,
    height: 36,
  },
  medium: {
    width: 72,
    height: 72
  },
  large: {
    width: 128,
    height: 128
  }
}));
