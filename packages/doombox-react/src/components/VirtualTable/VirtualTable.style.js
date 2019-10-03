import { makeStyles } from '@material-ui/core/styles';

export const useVirtualTableStyle = makeStyles(theme => ({
  head: {
    height: theme.component.virtualCell
  },
  row: {
    display: 'flex',
    width: ({ width }) => width
  },
  cell: {
    width: ({ count }) => `${100 / count}%`,
    overflow: 'hidden'
  }
}));
