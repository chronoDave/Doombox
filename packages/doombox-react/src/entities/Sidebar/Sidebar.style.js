import { makeStyles } from '@material-ui/core/styles';

export const useSidebarStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: theme.dimensions.sidebar.tab + theme.dimensions.sidebar.panel,
    height: `calc(100% - ${theme.dimensions.appBar}px)`
  },
  tab: {
    width: theme.dimensions.sidebar.tab,
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'column'
  },
  iconButton: {
    fontSize: '1.75rem',
    padding: theme.spacing(),
    margin: theme.spacing(0.5)
  },
  avatar: {
    margin: theme.spacing(0.5)
  },
  collection: {
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
  playlist: {
    flexGrow: 1,
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginLeft: theme.spacing(0.5),
    'will-change': 'transform'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.dimensions.sidebar.panel,
    backgroundColor: theme.palette.grey[100]
  },
  listItemIcon: {
    minWidth: theme.spacing(4)
  },
  noWrap: {
    width: '100%',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },
  active: {
    backgroundColor: theme.palette.primary.main
  }
}));
