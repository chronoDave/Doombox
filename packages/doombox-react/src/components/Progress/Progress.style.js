import { makeStyles } from '@material-ui/core/styles';

export const useProgressStyles = makeStyles(theme => ({
  disableAnimation: {
    transition: null
  },
  root: {
    width: '100%',
    marginRight: theme.spacing()
  }
}));
