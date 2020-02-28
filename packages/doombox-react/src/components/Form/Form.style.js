import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5, 0),
    width: '100%',
    '& button:first-child': {
      marginRight: theme.spacing(0.5)
    },
    '& button:last-child': {
      marginLeft: theme.spacing(0.5)
    }
  }
}));
