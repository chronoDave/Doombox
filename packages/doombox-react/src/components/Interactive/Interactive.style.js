import { makeStyles } from '@material-ui/core/styles';

export const useInteractiveStyle = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.modal + 1
  }
}));
