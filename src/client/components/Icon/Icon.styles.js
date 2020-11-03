import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    fontSize: theme.typography.pxToRem(24)
  },
  small: {
    fontSize: theme.typography.pxToRem(20)
  }
}), 'icon');
