import { makeStyles } from '@material-ui/core/styles';

export const useSettingsStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'center',
    outline: 0,
    height: '100%'
  },
  tabsRoot: {
    width: 'fit-content',
    flexShrink: 0
  },
  tabRoot: {
    opacity: 0.4
  },
  iconButton: {
    color: theme.palette.grey[50],
    height: 'fit-content'
  }
}));
