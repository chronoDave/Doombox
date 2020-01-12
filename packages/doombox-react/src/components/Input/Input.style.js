import { makeStyles } from '@material-ui/core/styles';

export const useInputStyles = makeStyles(theme => ({
  inputSearchRoot: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius
  },
  inputSearchInput: {
    width: '100%',
    padding: theme.spacing(0.75)
  },
  endAdornment: {
    marginLeft: theme.spacing(),
    padding: 0,
    color: theme.palette.grey[400]
  }
}));
