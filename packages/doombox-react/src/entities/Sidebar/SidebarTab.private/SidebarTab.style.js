import { makeStyles } from '@material-ui/core/styles';

export const useSidebarTabStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1),
    width: theme.dimensions.sidebar.tab,
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    fontSize: '1.75rem',
    padding: theme.spacing(),
    margin: theme.spacing(0.5)
  },
  avatar: {
    margin: theme.spacing(0.5)
  },
  sticky: {
    padding: theme.spacing(0.5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  scrollable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 0
    },
  }
}));
