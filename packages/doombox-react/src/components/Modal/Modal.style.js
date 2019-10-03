import { makeStyles } from '@material-ui/core/styles';

export const useModalStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'center',
    outline: 0,
    height: '100%'
  },
  iconButton: {
    color: theme.palette.grey[50],
    height: 'fit-content'
  }
}));
