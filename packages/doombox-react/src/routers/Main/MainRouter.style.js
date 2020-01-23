import { makeStyles } from '@material-ui/core/styles';

export const useMainRouterStyles = makeStyles(theme => ({
  root: {
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
