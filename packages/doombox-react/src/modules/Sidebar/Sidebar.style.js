import { makeStyles } from '@material-ui/core/styles';

export const useSidebarStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel.xs,
    height: `calc(100% - ${theme.dimensions.appBar}px)`,
    [theme.breakpoints.up('md')]: {
      width: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel.md,
    }
  },
  tab: {
    width: theme.dimensions.sidebar.tab,
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    flexDirection: 'column'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.dimensions.sidebar.panel.xs,
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('md')]: {
      width: theme.dimensions.sidebar.panel.md
    }
  },
  children: {
    position: 'fixed',
    left: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel.xs,
    height: `calc(100% - ${theme.dimensions.appBar}px)`,
    width: `calc(100% - ${theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel.xs}px)`,
    overflow: 'auto',
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('md')]: {
      left: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel.md,
      width: `calc(100% - ${theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel.md}px)`,
    }
  }
}));
