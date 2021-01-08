import { makeStyles } from '../../theme';

export default makeStyles(() => ({
  root: {
    outline: 0,
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0
  },
  holding: {
    transform: 'translate(0, 1px)'
  },
  disabled: {
    cursor: 'default'
  }
}), 'buttonBase');
