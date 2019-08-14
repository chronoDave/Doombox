import { makeStyles } from '@material-ui/core/styles';

export const useMainStyle = makeStyles(theme => ({
  root: {
    marginLeft: theme.component.sidebar
  }
}));
