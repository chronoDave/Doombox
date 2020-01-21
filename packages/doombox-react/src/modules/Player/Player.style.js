import { makeStyles } from '@material-ui/core/styles';

export const usePlayerStyles = makeStyles(theme => ({
  image: {
    flexShrink: 0,
    width: theme.dimensions.sidebar.panel,
    height: theme.dimensions.sidebar.panel,
    padding: theme.spacing(),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconButton: {
    padding: theme.spacing()
  }
}));
