import { makeStyles } from '@material-ui/core';

// Utils
import { isMac } from '../../../../doombox-utils';

export const useAppStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100vw',
    height: '100vh'
  },
  appBar: {
    top: theme.component.appBar,
    height: `calc(100vh - ${theme.component.appBar}px)`
  },
  player: {
    position: 'fixed',
    top: !isMac ? theme.component.appBar : 0,
    width: theme.component.player.xs,
    [theme.breakpoints.up('md')]: {
      width: theme.component.player.md
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.component.player.lg
    }
  },
  library: {
    position: 'fixed',
    top: !isMac ? theme.component.appBar : 0,
    left: theme.component.player.xs,
    width: `calc(100% - ${theme.component.player.xs}px)`,
    height: !isMac ?
      `calc(100% - ${theme.component.appBar}px)` :
      '100%',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      left: theme.component.player.md,
      width: `calc(100% - ${theme.component.player.md}px)`
    },
    [theme.breakpoints.up('lg')]: {
      left: theme.component.player.lg,
      width: `calc(100% - ${theme.component.player.lg}px)`
    }
  }
}));
