import { makeStyles } from '@material-ui/core/styles';

export const useVirtualStyles = makeStyles(theme => ({
  inset: {
    paddingLeft: theme.spacing(2)
  },
  active: {
    backgroundColor: theme.palette.primary.main
  }
}));
