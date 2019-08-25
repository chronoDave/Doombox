import { makeStyles } from '@material-ui/core/styles';

export const useMainPageStyle = makeStyles(theme => ({
  root: {
    marginLeft: theme.component.sidebar
  }
}));
