import { makeStyles } from '@material-ui/core/styles';

export const useNavigationStyles = makeStyles(theme => ({
  playlist: {
    width: '100%',
    paddingBottom: theme.spacing(1),
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
  activeBar: {
    position: 'absolute',
    left: 0,
    width: theme.spacing(0.5),
    height: theme.spacing(3),
    backgroundColor: theme.palette.type === 'dark' ?
      theme.palette.text.primary :
      theme.palette.text.secondary,
    borderRadius: '0px 4px 4px 0px'
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
