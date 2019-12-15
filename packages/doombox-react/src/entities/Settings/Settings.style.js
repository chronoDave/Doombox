import { makeStyles } from '@material-ui/core/styles';

export const useSettingStyles = makeStyles(theme => ({
  body: {
    flexGrow: 1,
    padding: theme.spacing(0, 2),
    'will-change': 'transform',
    overflowY: 'auto',
    overflowX: 'hidden',
  }
}));
