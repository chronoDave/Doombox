import { makeStyles } from '@material-ui/core/styles';

export const useTableStyles = makeStyles(theme => ({
  root: {
    borderSpacing: 0,
    paddingTop: theme.spacing()
  },
  label: {
    paddingRight: theme.spacing()
  },
  value: {
    width: '100%'
  }
}));
