import { makeStyles } from '@material-ui/core/styles';

export const useNavigationStyles = makeStyles(theme => ({
  iconButton: {
    fontSize: '1.75rem',
    padding: theme.spacing(),
    margin: theme.spacing(0.5)
  },
  active: {
    position: 'absolute',
    width: theme.spacing(0.5),
    left: 0,
    borderRadius: '0px 4px 4px 0px',
    height: '52px',
    backgroundColor: theme.palette.primary.main
  }
}));
