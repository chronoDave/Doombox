import { makeStyles } from '@material-ui/core/styles';

export const usePlayerStyles = makeStyles(theme => ({
  image: {
    flexShrink: 0,
    width: theme.dimensions.sidebar.panel.xs,
    height: theme.dimensions.sidebar.panel.xs,
    padding: theme.spacing(),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: theme.dimensions.sidebar.panel.md,
      height: theme.dimensions.sidebar.panel.md,
    }
  },
  iconButton: {
    padding: theme.spacing()
  }
}));
