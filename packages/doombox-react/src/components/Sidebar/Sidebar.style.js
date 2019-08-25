import { makeStyles } from '@material-ui/core/styles';

export const useSidebarStyle = makeStyles(theme => ({
  paper: {
    width: theme.component.sidebar,
    backgroundColor: theme.palette.grey[400],
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    position: 'fixed',
    bottom: 0,
    height: 60,
    width: theme.component.sidebar,
  },
  icon: {
    color: theme.palette.grey[50]
  },
  button: {
    padding: theme.spacing(),
    color: theme.palette.grey[50]
  },
  sliderThumb: {
    marginTop: -4,
    width: 9,
    height: 9
  },
}));
