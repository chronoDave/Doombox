import { makeStyles } from '@material-ui/core';

export const useAppBarStyles = makeStyles(theme => ({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
  },
  titleRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    minWidth: 0,
    flexGrow: 1
  },
  titleHidden: {
    minWidth: 0,
  },
  buttonWindowClose: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    }
  },
  drag: {
    '-webkit-app-region': 'drag'
  }
}));
