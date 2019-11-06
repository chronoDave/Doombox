import { makeStyles } from '@material-ui/core/styles';

export const usePlayerStyle = makeStyles(theme => ({
  paperRoot: {
    width: `${theme.component.sidepanel - theme.spacing(4)}px`,
    height: `${theme.component.sidepanel - theme.spacing(4)}px`,
  },
  iconButtonRoot: {
    color: theme.palette.grey[50]
  },
  noWrap: {
    width: '100%',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  }
}));
