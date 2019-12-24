import { makeStyles } from '@material-ui/core/styles';

export const useSidebarStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel,
    height: `calc(100% - ${theme.dimensions.appBar}px)`
  },
  tab: {
    width: theme.dimensions.sidebar.tab,
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'column'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.dimensions.sidebar.panel,
    backgroundColor: theme.palette.grey[100]
  }
}));
