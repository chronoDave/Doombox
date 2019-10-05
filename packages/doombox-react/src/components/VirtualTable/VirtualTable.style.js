import { fade, makeStyles } from '@material-ui/core/styles';

export const useVirtualTableStyle = makeStyles(theme => ({
  root: {
    backgroundColor: fade(theme.palette.background.default, 0.75)
  },
  active: {
    backgroundColor: fade(theme.palette.primary.main, 0.66)
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'left',
    padding: theme.spacing(0, 3)
  },
  head: {
    pr: 14,
    backgroundColor: fade(theme.palette.background.default, 0.75)
  }
}));
