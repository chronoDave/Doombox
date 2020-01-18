import { makeStyles } from '@material-ui/core/styles';

export const useNavigationStyles = makeStyles(theme => ({
  playlist: {
    padding: theme.spacing(0.5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    'will-change': 'transform',
    '&::-webkit-scrollbar': {
      width: 0
    }
  },
  avatar: {
    margin: theme.spacing(0.5)
  },
  delete: {
    color: theme.palette.error.main
  },
  listItem: {
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius
  }
}));
