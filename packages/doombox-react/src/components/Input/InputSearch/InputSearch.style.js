import { makeStyles } from '@material-ui/core/styles';

export const useInputSearchStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius
  },
  input: {
    width: '100%',
    padding: theme.spacing(0.75)
  },
  endAdornment: {
    marginLeft: theme.spacing(),
    padding: 0,
    color: theme.palette.grey[400]
  },
  iconCancel: {
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.grey[600],
      backgroundColor: 'none'
    }
  }
}));
