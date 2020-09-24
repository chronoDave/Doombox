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
  }
}));
