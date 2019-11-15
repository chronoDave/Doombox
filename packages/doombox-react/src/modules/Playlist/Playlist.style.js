import { makeStyles } from '@material-ui/core/styles';

export const usePlaylistStyle = makeStyles(theme => ({
  paperImageRoot: {
    width: '100%'
  },
  listItemIconRoot: {
    minWidth: theme.spacing(5)
  },
  primaryRoot: {
    fontWeight: 'bolder'
  },
  active: {
    backgroundColor: theme.palette.primary.main
  },
  noWrap: {
    width: '100%',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  }
}));
