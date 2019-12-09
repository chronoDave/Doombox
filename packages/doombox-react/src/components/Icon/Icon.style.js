import { makeStyles } from '@material-ui/core/styles';

export const useIconStyles = makeStyles(theme => ({
  root: {
    fill: theme.palette.action.active
  }
}));
