import { makeStyles } from '@material-ui/core/styles';

export const useSidebarPanelStyles = makeStyles(theme => ({
  root: {
    width: theme.dimensions.sidebar.panel,
    backgroundColor: theme.palette.grey[100]
  }
}));
