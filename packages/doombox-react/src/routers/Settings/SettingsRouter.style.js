import { makeStyles } from '@material-ui/core/styles';

export const useSettingsRouterStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(0, 2),
    'will-change': 'transform',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  tabsRoot: {
    flexShrink: 0
  },
  tabsContainer: {
    paddingRight: theme.spacing(2)
  }
}));
