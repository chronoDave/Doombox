import { makeStyles } from '@material-ui/core/styles';

export const useBackgroundStyles = makeStyles(() => ({
  background: {
    width: 'calc(100% - 9px)',
    height: '100%',
    position: 'absolute'
  }
}));
