import { makeStyles } from '@material-ui/core/styles';

export const useCollectionStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    marginLeft: theme.spacing(0.5),
    'will-change': 'transform'
  },
  iconButton: {
    fontSize: '1.75rem',
    padding: theme.spacing(),
    margin: theme.spacing(0.5)
  },
  avatar: {
    margin: theme.spacing(0.5)
  },
}));
