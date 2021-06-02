import { useStyles } from '../../hooks';

export default () => useStyles('Window', theme => ({
  root: {
    backgroundColor: theme.breakpoints.values.lg
  }
}));
