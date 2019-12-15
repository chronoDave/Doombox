import { makeStyles } from '@material-ui/core/styles';

export const useMainStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel,
    height: `calc(100% - ${theme.dimensions.appBar}px)`,
    width: `calc(100% - ${theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel}px)`,
    overflow: 'auto'
  }
}));
