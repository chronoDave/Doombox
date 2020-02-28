import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles(theme => ({
  submit: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5, 0),
    width: '100%'
  },
  submitChildren: {
    '& button:first-child': {
      marginRight: theme.spacing(0.5)
    },
    '& button:last-child': {
      marginLeft: theme.spacing(0.5)
    }
  }
}));
