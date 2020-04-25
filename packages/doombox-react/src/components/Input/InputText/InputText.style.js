import { makeStyles } from '@material-ui/core/styles';

export const useInputTextStyles = makeStyles(theme => ({
  helperText: {
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    margin: theme.spacing(1)
  }
}));
