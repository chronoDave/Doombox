import { makeStyles } from '@material-ui/core/styles';

export const useSidepanelStyle = makeStyles(theme => ({
  paper: {
    width: theme.component.sidepanel,
    backgroundColor: theme.palette.grey[500],
    backgroundPosition: 'center'
  },
  paperAnchorLeft: {
    left: theme.component.sidebar
  }
}));
