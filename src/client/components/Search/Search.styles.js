import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: ({ variant }) => ({
    ...theme.typography[variant],
    outline: 0,
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    width: '100%',
    color: theme.palette.primary.contrastText,
    display: 'inline-flex',
    height: 'fit-content'
  })
}), 'search');
