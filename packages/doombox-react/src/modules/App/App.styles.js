import { makeStyles } from '@material-ui/core';

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
    top: theme.component.appBar,
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
    top: theme.component.appBar,
    left: theme.component.player.xs,
    width: `calc(100% - ${theme.component.player.xs}px)`,
    height: `calc(100% - ${theme.component.appBar}px)`,
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
