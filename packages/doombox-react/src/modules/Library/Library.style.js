import { makeStyles } from '@material-ui/core/styles';

export const useLibraryStyles = makeStyles(theme => ({
  inset: {
    paddingLeft: theme.spacing(2)
  },
  active: {
    backgroundColor: theme.palette.primary.main
  }
}));
