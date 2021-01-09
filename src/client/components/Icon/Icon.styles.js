import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    fontSize: theme.pxToRem(24)
  },
  small: {
    fontSize: theme.pxToRem(20)
  }
}), 'icon');
