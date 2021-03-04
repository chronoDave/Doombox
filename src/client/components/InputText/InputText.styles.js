import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    minWidth: 0,
    padding: theme.spacing(0.5, 1),
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.dark ?
      theme.palette.grey[0] :
      theme.palette.grey[6],
  },
  input: {
    outline: 0,
    border: 'none',
    backgroundColor: 'unset',
    color: 'inherit',
    minWidth: 0,
    '&::placeholder': {
      color: theme.palette.text.disabled
    },
  }
}), 'inputText');
