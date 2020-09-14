import { makeStyles } from '@material-ui/core/styles';

export const useMenuStyles = makeStyles(theme => ({
  itemRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.75, 1)
  }
}));