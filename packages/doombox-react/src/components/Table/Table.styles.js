import { makeStyles } from '@material-ui/core/styles';

export const useTableStyles = makeStyles(theme => ({
  label: {
    paddingRight: theme.spacing()
  },
  value: {
    width: '100%'
  }
}));
